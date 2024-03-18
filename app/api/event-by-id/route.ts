import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (id) {
        const apiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
        const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`
        );

        const data = await response.json();
        return NextResponse.json(data);
    } else {
        return NextResponse.error();
    }
}