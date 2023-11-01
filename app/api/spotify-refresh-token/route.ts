import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();

    const { refreshToken } = body;

    const requestBody = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString();
    

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
      },
      body: requestBody,
    });
    if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
  

    const data = await response.json();

    const cookieStore = cookies();
    cookieStore.set('accessToken', data.access_token);

    console.error("REFRESH: Access token:" + data.access_token);


    return Response.json({"status": "success"});

}