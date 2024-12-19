import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _request: Request,

) {

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    const publicUrls = (await collection.find(
      {},
      { projection: {_id: 0, publicUrl: 1} },
    ).toArray()).map((url) => url.publicUrl)

    console.log("api public_urls", publicUrls);
    return NextResponse.json({publicUrls}, { status: 200 });
  } catch (error) {
    console.error("Error fetching user information:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
