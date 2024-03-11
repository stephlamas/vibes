import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);

    const countryCode = searchParams.get("countryCode");

    if (countryCode) {
        const apiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
        const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=${apiKey}`
        );

        const data = await response.json();
        return NextResponse.json(data);
    } else {
        return NextResponse.error();
    }
}
