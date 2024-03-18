import { NextRequest } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const searchParams = new URLSearchParams(req.url.split("?")[1] || "");

        const userId = searchParams.get('userId');

        if (!userId) {
            return Response.json({ error: "userId parameter is required" }, { status: 400 });
        }

        const mongoUrl = process.env.MONGODB_URL || "";
        const client = new MongoClient(mongoUrl);

        await client.connect();

        const database = client.db("vibes-db");
        const collection = database.collection("user-favorites");

        const existingUser = await collection.findOne({ userId });

        await client.close();

        if (!existingUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const favoriteEvents = existingUser.events;

        return Response.json({ favoriteEvents }, { status: 200 });

    } catch (err) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
