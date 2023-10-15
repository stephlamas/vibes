import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Authorization code not found" },
      { status: 400 },
    );
  }

  
  const cookieStore = cookies();

  //const refreshToken = cookieStore.get("refreshToken")?.value;
  //const accesToken = cookieStore.get("accessToken")?.value;

  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI || "",
  }).toString();

  try {
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
      throw new Error("Failed to exchange authorization code for tokens");
    }

    const data = await response.json();
    let { access_token: accessToken, refresh_token: refreshToken } = data;

    console.error("CALLBACK: Access token:" + accessToken);
    console.error("CALLBACK: Refresh token:" + refreshToken);

    cookieStore.set('accessToken', accessToken as string);
    cookieStore.set('refreshToken', refreshToken as string);

    return NextResponse.redirect(new URL('/home', req.url));

  } catch (error) {
    console.error("Error exchanging authorization code for tokens:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
