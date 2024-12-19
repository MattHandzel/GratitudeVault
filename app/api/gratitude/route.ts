import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function handler(req, res) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection(process.env.COLLECTION_NAME);

  if (req.method === "POST") {
    const { gratitude } = await req.json();
    if (!gratitude) {
      return NextResponse.json({ error: "Gratitude data is required" }, { status: 400 });
    }

    await collection.updateOne(
      { id: session.user.id },
      { $push: { gratitudes: gratitude } }
    );

    return NextResponse.json({ message: "Gratitude added successfully" }, { status: 200 });
  }

  if (req.method === "GET") {
    const gratitudes = await collection.findOne(
{ id: session.user.id },
  { 
    projection: { 
      gratitudes: { 
$filter: { 
          input: "$gratitudes", 
          as: "gratitude", 
          cond: { 
            $or: [
              { $ne: ["$$gratitude.archived", true] }, // Not equal to true
              { $not: { $ifNull: ["$$gratitude.archived", false] } } // Does not exist
            ]
          } 
        } 
      }, 
      _id: 0 
    }
  }    );

    return NextResponse.json({ message: gratitudes?.gratitudes || [] }, { status: 200 });
  }

  if (req.method === "PUT") {
    const data = await req.json();
    console.log(data)
    const { gratitudeTitle, gratitudeContent, updates } = data;

    if (!gratitudeTitle || !updates || !gratitudeContent) {
      return NextResponse.json({ error: "Gratitude ID and updates are required" }, { status: 400 });
    }

    const gratitudes = (await collection.findOne(
      { id: session.user.id },
      { projection: { gratitudes: 1 } }
    )).gratitudes;

    // find the target gratitude
    const targetGratitude = gratitudes.find((gratitude) => gratitude.title === gratitudeTitle && gratitude.content === gratitudeContent);
    targetGratitude.editedTimestamp = new Date();
    for(const key in updates) {
      targetGratitude[key] = updates[key];
    }
    console.log("changed gratitude", targetGratitude);

    // update the gratitude
    const result = await collection.updateOne(
      {
        id : session.user.id,
        
      },{ $set: { gratitudes: gratitudes } }
    )



    console.log("result", result)
    //await client.close()

    return NextResponse.json({ message: "Gratitude updated successfully" }, { status: 200 });
  }

  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export { handler as GET, handler as POST, handler as PUT };

