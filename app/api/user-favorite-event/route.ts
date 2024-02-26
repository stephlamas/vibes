import { NextRequest, NextResponse } from "next/server";
import { MongoClient, MongoClientOptions } from 'mongodb';

export async function DELETE(req: NextRequest, res: NextResponse) {

}

export async function POST(req: NextRequest, res: NextResponse) {
    const { userId, eventId } = await req.json();

    console.table({ userId, eventId })

    const mongoUrl = process.env.MONGODB_URL || "";

    const client = new MongoClient(mongoUrl as string);

    try {
        await client.connect();

        console.log('connected to the db')

        const database = client.db("vibes-db");
        const collection = database.collection("user-favorites");

        const existingUser = await collection.findOne({ userId });

        if (existingUser) {
            await collection.updateOne(
                { userId },
                { $addToSet: { events: eventId } }
            );
        } else {
            await collection.insertOne({ userId, events: [eventId] });
        }

        await client.close();

        return Response.json({ result: 'success' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
