"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMediaQuery, Theme, Box } from "@mui/material";
import { eventCardStyles, eventCardMediaStyles, eventCardFavoriteButtonStyles, eventCardPriceStyles, mobileEventCardStyles, boxMobileEventCardStyles } from "./styles/event-card.styles";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function EventCard() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box sx={boxMobileEventCardStyles}>
        <Card sx={mobileEventCardStyles}>
          <CardMedia
            sx={eventCardMediaStyles}
            image="https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-02.jpg"
            title="event"
          >
            <IconButton sx={eventCardFavoriteButtonStyles}>
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
            <Typography variant="PARAGRAPH_S" sx={eventCardPriceStyles}>Price</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Card sx={eventCardStyles}>
      <CardMedia
        sx={eventCardMediaStyles}
        image="https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-02.jpg"
        title="event"
      >
        <IconButton sx={eventCardFavoriteButtonStyles}>
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
        <Typography variant="PARAGRAPH_S" sx={eventCardPriceStyles}>Price</Typography>
      </CardContent>
    </Card>
  );
}

