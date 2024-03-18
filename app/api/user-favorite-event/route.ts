import { NextRequest } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const searchParams = new URLSearchParams(req.url.split("?")[1]);

        const userId = searchParams.get('userId');
        const eventId = searchParams.get('eventId');

        const mongoUrl = process.env.MONGODB_URL || "";
        const client = new MongoClient(mongoUrl);

        await client.connect();

        const database = client.db("vibes-db");
        const collection = database.collection("user-favorites");

        const existingUser = await collection.findOne({ userId });

        await client.close();

        const isFav = existingUser && existingUser.events.includes(eventId);

        return Response.json({ isFavorite: isFav }, { status: 200 });

    } catch (err) {
        console.error(err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId, eventId } = await req.json();

        const mongoUrl = process.env.MONGODB_URL || "";
        const client = new MongoClient(mongoUrl);

        await client.connect();

        const database = client.db("vibes-db");
        const collection = database.collection("user-favorites");

        const result = await collection.updateOne(
            { userId },
            { $pull: { events: eventId } }
        );

        await client.close();

        if (result.modifiedCount === 1) {
            return Response.json({ result: 'success' }, { status: 200 });
        } else {
            return Response.json({ error: "Event not found for the user" }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { userId, eventId } = await req.json();

    const mongoUrl = process.env.MONGODB_URL || "";

    const client = new MongoClient(mongoUrl as string);

    try {
        await client.connect();

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
