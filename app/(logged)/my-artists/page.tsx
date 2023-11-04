"use client";
import SpotifyClient from "@/app/layout/components/SpotifyClient";
import ArtistCard from "@/app/layout/components/artist-card/artist-card";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useMediaQuery } from '@mui/material';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        My Artists
      </Typography>
      <Typography variant="PARAGRAPH_S">
        Based on your Spotify listening history
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: isMobile ? theme.spacing(10) : 0,
        }}
      >
        {topArtists.map((artist) => (
           <Box key={artist.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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