import { Container, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ArtistEvents({ params }: { params: { artist: string } }) {
    const artistName = decodeURIComponent(params.artist);

    return (
        <Container>
            <Typography variant="TITLE_S"> Events by {artistName}</Typography>
        </Container>
    );
}
