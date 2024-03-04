"use client";
import SpotifyClient from "@/core/clients/spotify-client";
import ArtistCard from "@/app/layout/components/artist-card/artist-card";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  artistsMainBoxStyles,
  artistCardStyles,
  paginationButtonStyles,
  subtitleTypography
} from "./styles/my-artists.styles";

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  images: any;
};

const PAGE_SIZE = 16;

export default function MyArtists() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const spotifyClient = new SpotifyClient();

    spotifyClient
      .getTopItems("artists")
      .then((data) => {
        setTopArtists(data.items as Artist[]);
        setTotalPages(Math.ceil(data.items.length / PAGE_SIZE));
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, []);

  const getCurrentPageArtists = () => {
    const startIndex = currentPage * PAGE_SIZE;
    return topArtists.slice(startIndex, startIndex + PAGE_SIZE);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        My Artists
      </Typography>
      <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
        Based on your Spotify listening history
      </Typography>
      <Box sx={artistsMainBoxStyles()}>
        {getCurrentPageArtists().map((artist) => (
          <Box key={artist.id} sx={artistCardStyles}>
            <Link href="/my-artist-events">
              <ArtistCard
                artist={{
                  name: artist.name,
                  imageUrl: artist.images[0].url,
                }}
              />
            </Link>
          </Box>
        ))}
      </Box>
      <Box
        sx={paginationButtonStyles}
      >
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          style={{ color: currentPage === 0 ? "gray" : "black" }}
        >
          Previous
        </Button>
        <Button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          style={{ color: currentPage >= totalPages - 1 ? "gray" : "black" }}
        >
          Next
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}
