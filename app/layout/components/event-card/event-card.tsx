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

type EventCardProps = {
  key: string;
  name: string;
  date: string;
  price: number;
  currency: string;
  imageUrl: string;
  city: string;
};

export default function EventCard({ key, name, date, price, currency, imageUrl, city }: EventCardProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box sx={boxMobileEventCardStyles}>
        <Card key={key} sx={mobileEventCardStyles}>
          <CardMedia
            sx={eventCardMediaStyles}
            image={imageUrl}
            title="event"
          >
            <IconButton sx={eventCardFavoriteButtonStyles}>
              <FavoriteBorderIcon />
            </IconButton>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="PARAGRAPH_S_BOLD" component="div">
              {name}
            </Typography>
            <Typography variant="PARAGRAPH_S" color="text.secondary">
              {date} - {city}
            </Typography>
            <Typography variant="PARAGRAPH_S" sx={eventCardPriceStyles}>{currency}{price}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Card key={key} sx={eventCardStyles}>
      <CardMedia
        sx={eventCardMediaStyles}
        image={imageUrl}
        title="event"
      >
        <IconButton sx={eventCardFavoriteButtonStyles}>
          <FavoriteBorderIcon />
        </IconButton>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="PARAGRAPH_S_BOLD" component="div">
          {name}
        </Typography>
        <Typography variant="PARAGRAPH_S" color="text.secondary">
          {date} - {city}
        </Typography>
        <Typography variant="PARAGRAPH_S" sx={eventCardPriceStyles}>{currency}{price}</Typography>
      </CardContent>
    </Card>
  );
}

