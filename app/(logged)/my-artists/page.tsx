"use client";
import SpotifyClient from "@/app/layout/components/SpotifyClient";
import ArtistCard from "@/app/layout/components/artist-card/artist-card";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useArtistsMainBoxStyles, artistCardStyles } from "./styles/my-artists.styles";

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  images: any;
};

export default function MyArtists() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const spotifyClient = new SpotifyClient();

    spotifyClient
      .getTopItems("artists")
      .then((data) => {
        setTopArtists(data.items as Artist[]);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, []);


  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        My Artists
      </Typography>
      <Typography variant="PARAGRAPH_S">
        Based on your Spotify listening history
      </Typography>
      <Box
        sx={useArtistsMainBoxStyles()}
      >
        {topArtists.map((artist) => (
         <Box key={artist.id} sx={artistCardStyles}> 
            <ArtistCard
              artist={{
                name: artist.name,
                imageUrl: artist.images[0].url,
              }}
            />
          </Box>
        ))}
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}