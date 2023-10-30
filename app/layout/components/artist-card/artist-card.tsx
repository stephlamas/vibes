import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ArtistCardStyles, ArtistCardMediaStyles } from "./styles/artist-card.styles";



export default function ArtistCard() {
  return (
    <Card sx={ArtistCardStyles}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://singersroom.com/wp-content/uploads/2023/02/Johnny-Cash-Songs.jpg"
          alt="artist-image"
          sx={ArtistCardMediaStyles}
        />
        <CardContent>
          <Typography gutterBottom variant="PARAGRAPH_S_BOLD" sx={{ justifyContent: "center" }}>
            Artist name
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
