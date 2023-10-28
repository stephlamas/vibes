import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { eventCardStyles } from "./styles/event-card.styles";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function EventCard() {
  return (
    <Card sx={eventCardStyles}>
      <CardMedia
        sx={{
          height: 140,
          position: "relative",
        }}
        image="https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-02.jpg"
        title="event"
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </CardMedia>

      <CardContent>
        <Typography gutterBottom variant="PARAGRAPH_S_BOLD" component="div">
          Event
        </Typography>
        <Typography variant="PARAGRAPH_S" color="text.secondary">
          Date and location
        </Typography>
        <Typography variant="PARAGRAPH_S">Price</Typography>
      </CardContent>
    </Card>
  );
}
