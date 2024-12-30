import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { encrypt_user_data, decrypt_user_data } from "@/lib/utils";

async function handler(req, res) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection(process.env.COLLECTION_NAME);

  if (req.method === "POST") {
    const { gratitude } = await req.json();
    if (!gratitude) {
      return NextResponse.json(
        { error: "Gratitude data is required" },
        { status: 400 },
      );
    }

    if (gratitude.privacyLevel === "private") {
      gratitude.title = encrypt_user_data(gratitude.title, {
        id: session.user.id,
      }).encrypted;
      gratitude.content = encrypt_user_data(gratitude.content, {
        id: session.user.id,
      }).encrypted;
      gratitude.encrypted = true;
    }

    await collection.updateOne(
      { id: session.user.id },
      { $push: { gratitudes: gratitude } },
    );

    return NextResponse.json(
      { message: "Gratitude added successfully" },
      { status: 200 },
    );
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
                  { $ne: ["$$gratitude.archived", true] },
                  { $not: { $ifNull: ["$$gratitude.archived", false] } },
                ],
              },
            },
          },
          _id: 0,
        },
      },
    );

    const decryptedGratitudes = gratitudes?.gratitudes.map((gratitude) => {
      if (gratitude.encrypted) {
        return {
          ...gratitude,
          title: decrypt_user_data(gratitude.title, { id: session.user.id }),
          content: decrypt_user_data(gratitude.content, {
            id: session.user.id,
          }),
        };
      }
      return gratitude;
    });

    return NextResponse.json(
      { message: decryptedGratitudes || [] },
      { status: 200 },
    );
  }

  if (req.method === "PUT") {
    const data = await req.json();
    console.log(data);
    const { gratitudeTitle, gratitudeContent, updates } = data;

    if (!gratitudeTitle || !updates || !gratitudeContent) {
      return NextResponse.json(
        { error: "Gratitude ID and updates are required" },
        { status: 400 },
      );
    }

    let gratitudes = (
      await collection.findOne(
        { id: session.user.id },
        { projection: { gratitudes: 1 } },
      )
    ).gratitudes;

    // decrypt gratitdues
    let decryptedGratitudes = gratitudes.map((gratitude) => {
      if (gratitude.encrypted) {
        gratitude = {
          ...gratitude,
          title: decrypt_user_data(gratitude.title, { id: session.user.id }),
          content: decrypt_user_data(gratitude.content, {
            id: session.user.id,
          }),
        };
        console.log("decrypted gratitude", gratitude);
        return gratitude;
      }
      return gratitude;
    });
    console.log("gratitudeTitle", gratitudeTitle);
    console.log("gratitudeTitle", gratitudeContent);
    console.log("penis");

    console.log("gratitudes", gratitudes);
    gratitudes.forEach((gratitude) => {
      if (gratitude.encrypted) {
        console.log("encrypted", gratitude);
      }
      return gratitude;
    });

    // find the target gratitude

    let indexOfChange = 0;
    decryptedGratitudes.forEach((gratitude, idx) => {
      if (
        gratitude.title === gratitudeTitle &&
        gratitude.content === gratitudeContent
      ) {
        indexOfChange = idx;
      }
    });
    const targetGratitude = decryptedGratitudes[indexOfChange];
    if (!targetGratitude) {
      console.log("gratitude not found", targetGratitude);
      return NextResponse.json(
        { error: "Gratitude not found" },
        { status: 404 },
      );
    }
    targetGratitude.editedTimestamp = new Date();

    if (
      updates.privacyLevel === "private" ||
      (targetGratitude.privacyLevel === "private" && !updates.privacyLevel)
    ) {
      updates.title = encrypt_user_data(
        updates.title || targetGratitude.title,
        { id: session.user.id },
      ).encrypted;
      updates.content = encrypt_user_data(
        updates.content || targetGratitude.content,
        { id: session.user.id },
      ).encrypted;
      updates.encrypted = true;
    } else if (updates.privacyLevel === "public" && targetGratitude.encrypted) {
      updates.title = decrypt_user_data(targetGratitude.title, {
        id: session.user.id,
      });
      updates.content = decrypt_user_data(targetGratitude.content, {
        id: session.user.id,
      });
      updates.encrypted = false;
    }

    for (const key in updates) {
      targetGratitude[key] = updates[key];
    }
    console.log("changed gratitude", targetGratitude);
    gratitudes[indexOfChange] = targetGratitude;

    // update the gratitude
    const result = await collection.updateOne(
      {
        id: session.user.id,
      },
      { $set: { gratitudes: gratitudes } },
    );

    console.log("result", result);

    return NextResponse.json(
      { message: "Gratitude updated successfully" },
      { status: 200 },
    );
  }

  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export { handler as GET, handler as POST, handler as PUT };
