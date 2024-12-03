//import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { gratitude } = await req.json();
    console.log("gradidute", gratitude);

    if (!gratitude) {
      return res.status(400).json({ error: "Gratitude data is required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME);

      // Add the gratitude item to the user's document
      console.log("user session id is", session.user.id);
      await collection.updateOne(
        { id: session.user.id }, // Match document by user ID
        { $push: { gratitudes: gratitude } }, // Append gratitude to the array
      );

      return NextResponse.json(
        { message: "Gratitude added successfully" },
        { status: 200 },
      );
    } catch (error) {
      console.error("Error adding gratitude:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }

  // GET: Retrieve all gratitudes for the authenticated user
  if (req.method === "GET") {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME);

      const gratitudes = (
        await collection.findOne(
          { id: session.user.id },
          { projection: { gratitudes: 1, _id: 0 } },
        )
      )?.gratitudes;
      console.log("gratitudes", gratitudes);

      if (!gratitudes) {
        return NextResponse.json({ gratitudes: {} }, { status: 200 });
      }

      return NextResponse.json({ message: gratitudes }, { status: 200 });
    } catch (error) {
      console.error("Error fetching gratitudes:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export { handler as GET, handler as POST };
