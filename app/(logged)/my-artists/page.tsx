"use client";
import ArtistCard from "@/app/layout/components/artist-card/artist-card";
import { Typography } from "@mui/material";

export default function MyArtists() {
    return (
        <>
            <Typography variant="TITLE_S" component="h1">
                My Artists
            </Typography>
            <Typography variant="PARAGRAPH_XS">
                Based on your Spotify listening history
            </Typography>
            <ArtistCard />
        </>
    );
}