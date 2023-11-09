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
import moment from 'moment';

type EventCardProps = {
  id: string;
  name: string;
  date: string;
  time: string;
  price: number | string;
  currency: string;
  imageUrl: string;
  city: string;
  venue: string;
};

function formatCurrency(price: number | string, currency: string): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };

  if (isNaN(Number(price))) {
    return price.toString();
  }

  const currencySymbol = currencySymbols[currency] || '';

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(price));

  const numericPart = formattedPrice.replace(/[^\d.,]/g, '');

  return `${currencySymbol}${numericPart}`;
}


export default function EventCard({ id, name, date, price = 'TBD', currency, imageUrl, city, venue, time }: EventCardProps) {
  const formattedDate = moment(date).format('ll')
  const timeMoment = moment(time, 'HH:mm');
  const formattedTime = timeMoment.format('HH:mm');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box sx={boxMobileEventCardStyles}>
        <Card key={id} sx={mobileEventCardStyles}>
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
              {formattedDate}
            </Typography>
            <Typography variant="PARAGRAPH_XS" noWrap color="text.secondary">
              {formattedTime}
            </Typography>
            <Typography variant="PARAGRAPH_XS" color="text.secondary">
              {city} · {venue}
            </Typography>
            <Typography variant="PARAGRAPH_S_BOLD" sx={mobileEventCardPriceStyles}>{formatCurrency(price, currency)}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Card key={id} sx={{ display: 'flex', width: '800px' }}>
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
          <Typography variant="PARAGRAPH_XS" noWrap color="text.secondary">
            {formattedDate}
          </Typography>
          <Typography variant="PARAGRAPH_XS" noWrap color="text.secondary">
            {formattedTime}
          </Typography>
          <Typography variant="PARAGRAPH_S" noWrap color="text.secondary">
            {city} · {venue}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
          <Typography variant="PARAGRAPH_S_BOLD" sx={eventCardPriceStyles}>
           {formatCurrency(price, currency)}
          </Typography>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}