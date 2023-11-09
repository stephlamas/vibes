"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMediaQuery, Theme, Box } from "@mui/material";
import { mobileEventCardPriceStyles, mobileEventCardMediaStyles, eventCardMediaStyles, mobileEventCardFavoriteButtonStyles, eventCardPriceStyles, mobileEventCardStyles, boxMobileEventCardStyles, eventCardFavoriteButtonStyles } from "./styles/event-card.styles";
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
  venue: string;
};

export default function EventCard({ key, name, date, price, currency, imageUrl, city, venue }: EventCardProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box sx={boxMobileEventCardStyles}>
        <Card key={key} sx={mobileEventCardStyles}>
          <CardMedia
            sx={mobileEventCardMediaStyles}
            image={imageUrl}
            title="event"
          >
            <IconButton sx={mobileEventCardFavoriteButtonStyles}>
              <FavoriteBorderIcon />
            </IconButton>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="PARAGRAPH_M_BOLD" component="div">
              {name}
            </Typography>
            <Typography variant="PARAGRAPH_XS" noWrap color="text.secondary">
              {date}
            </Typography>
            <Typography variant="PARAGRAPH_XS" color="text.secondary">
              {city} · {venue}
            </Typography>
            <Typography variant="PARAGRAPH_S_BOLD" sx={mobileEventCardPriceStyles}>{currency} {price}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Card sx={{ display: 'flex', width: '800px' }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={eventCardMediaStyles}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="PARAGRAPH_M_BOLD" noWrap>
            {name}
          </Typography>
          <Typography variant="PARAGRAPH_S" noWrap color="text.secondary">
            {date}
          </Typography>
          <Typography variant="PARAGRAPH_S" noWrap color="text.secondary">
            {city} · {venue}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
          <Typography variant="PARAGRAPH_S_BOLD" sx={eventCardPriceStyles}>
            {currency} {price}
          </Typography>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}