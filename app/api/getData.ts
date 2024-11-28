import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection("data");

  // Find data for the logged-in user
  const userData = await collection.find({ userId: session.user.id }).toArray();

  res.status(200).json(userData);
}


