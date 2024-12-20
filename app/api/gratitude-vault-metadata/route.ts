import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(_request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    const allUsers = await collection.find({}).toArray();
    console.log("allUsers", allUsers);
    const numUsers = allUsers.length;
    const numGratitudes = allUsers.reduce((acc, user) => {
      console.log("user", user);
      const userGratitudes = user.gratitudes;
      acc += userGratitudes.length;
      return acc;
    }, 0);
    console.log("numberGratitudes", numGratitudes);
    console.log("numUsers", numUsers);

    return NextResponse.json({ numUsers, numGratitudes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user information:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
