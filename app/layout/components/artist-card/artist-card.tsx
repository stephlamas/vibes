import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { artistCardStyles, artistCardMediaStyles, artistCardActionStyles } from "./styles/artist-card.styles";

type ArtistCardProps = {
  name: string;
  imageUrl: string;
};

export default function ArtistCard({ artist }: { artist: ArtistCardProps}) {
  return (
    <Card sx={artistCardStyles}>
      <CardActionArea sx={artistCardActionStyles}>
        <CardMedia
          component="img"
          height="140"
          image={artist.imageUrl}
          alt="artist-image"
          sx={artistCardMediaStyles}
        />
        <CardContent>
          <Typography gutterBottom variant="PARAGRAPH_S_BOLD" sx={{ justifyContent: "center" }}>
            {artist.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
