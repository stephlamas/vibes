'use client';
import React, { useEffect, useState } from "react";

export default function SpotifyCallback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authorizationCode = new URLSearchParams(window.location.search).get(
      "code"
    );
    console.log("Authorization code:", authorizationCode);
  
    if (authorizationCode) {
      const requestBody = new URLSearchParams({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: process.env.REDIRECT_URI || "",
      }).toString();
  
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
        },
        body: requestBody,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to exchange authorization code for tokens");
          }
          return response.json();
        })
        .then((data) => {
          const { access_token: accessToken, refresh_token: refreshToken } = data;
          
          document.cookie = `accessToken=${accessToken}; path=/`;
          document.cookie = `refreshToken=${refreshToken}; path=/`;
          
          console.log("Access token:", accessToken);
          console.log("Refresh token:", refreshToken);
        })
        .catch((error) => {
          console.error("Error exchanging authorization code for tokens:", error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(() => {  
        throw new Error("Authorization code not found");
      }
      );
      setLoading(false);
    }
  }, []);
  

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      {!loading && !error ? <p>Success!</p> : null}
    </div>
  );
}
