import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);

    const artistName = searchParams.get("artist");

    if (artistName) {
        const apiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
        const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(artistName)}`
        );

        const data = await response.json();
        return NextResponse.json(data);
    } else {
        return NextResponse.error();
    }
}
