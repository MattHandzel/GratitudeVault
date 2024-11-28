import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  console.log("req.method", req.method);
  console.log("req.body", req.body);
  return res.status(200).json({ message: "Hello from the API" });
  if (req.method === "POST") {
    console.log("req.body", req.body);

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { gratitude } = req.body; // Expect gratitude in the request body

    if (!gratitude) {
      return res.status(400).json({ error: "Gratitude data is required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection("data");

      // Add the gratitude item to the user's document
      await collection.updateOne(
        { _id: session.user.id }, // Match document by user ID
        { $push: { gratitudes: gratitude } } // Append gratitude to the array
      );

      return res.status(200).json({ message: "Gratitude added successfully" });
    } catch (error) {
      console.error("Error adding gratitude:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // GET: Retrieve all gratitudes for the authenticated user
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection("data");

      const userGratitudes = await collection.findOne(
        { _id: session.user.id },
        { projection: { gratitudes: 1 } } 
      );

      if (!userGratitudes) {
        return res.status(404).json({ error: "No gratitudes found" });
      }

      return res.status(200).json({ gratitudes: userGratitudes.gratitudes });
    } catch (error) {
      console.error("Error fetching gratitudes:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

export { handler as GET, handler as POST }
