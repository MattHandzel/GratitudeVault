import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(_request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    const allUsers = await collection.find({}).toArray();
    console.log("allUsers", allUsers);
    const numberUsers = allUsers.length;
    const numberGratitudes = allUsers.reduce((acc, user) => {
      console.log("user", user);
      const userGratitudes = user.gratitudes;
      acc += userGratitudes.length;
      return acc;
    }, 0);
    const numberDaysGrateful = allUsers.reduce((acc, user) => {
      console.log("user", user);
      const userGratitudes = user.gratitudes;
      // Get the date of each gratitude and get the date in year, month, format. Then get the unique dates and add that to accumulator

      const dates = [];
      for (let i = 0; i < userGratitudes.length; i++) {
        const date = new Date(userGratitudes[i].createdTimestamp);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const dateStr = `${year}-${month}-${day}`;
        dates.push(dateStr);
      }
      const uniqueDates = [...new Set(dates)];
      acc += uniqueDates.length;
      return acc;
    }, 0);
    console.log("numberberGratitudes", numberGratitudes);
    console.log("numberUsers", numberUsers);

    return NextResponse.json(
      { numberUsers, numberGratitudes, numberDaysGrateful },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user information:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
