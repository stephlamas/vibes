import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function refreshAccessToken(refreshToken: string) {
  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: requestBody,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || "Failed to refresh access token");
  }

  return data.access_token; 
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    accessToken = await refreshAccessToken(refreshToken);
  }

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ error: "Could not obtain a valid access token" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    return new NextResponse(
      JSON.stringify({ error: errorResponse.error.message }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = await response.json();

  const artists = data.items.map((artist: { name: string; images: { url: string; }[]; }) => ({
    name: artist.name,
    image: artist.images[0]?.url || null,
  }));
  
  return new NextResponse(JSON.stringify(artists), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
