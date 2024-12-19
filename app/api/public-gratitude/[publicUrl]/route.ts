import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _request: Request,
  { params }: { params: { publicUrl: string } },
) {
  const publicUrl = params.publicUrl;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    const user = await collection.findOne({ publicUrl: publicUrl });
    console.log("user is", user, "publicUrl is", publicUrl);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const publicGratitudes = user.gratitudes.filter(
      (gratitude: any) => gratitude.privacyLevel === "public",
    );
    //console.log("api public gratitudes", publicGratitudes);

    return NextResponse.json({ gratitudes: publicGratitudes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching public gratitudes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
