import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMediaQuery, Theme, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import Link from "next/link";
import SpotifyClient from "@/core/clients/spotify-client";
import favoritesClient from "@/core/clients/favorites-client";

import {
  eventCardStyles,
  mobileEventCardPriceStyles,
  mobileEventCardMediaStyles,
  eventCardMediaStyles,
  mobileEventCardFavoriteButtonStyles,
  eventCardPriceStyles,
  mobileEventCardStyles,
  boxMobileEventCardStyles,
} from "./styles/event-card.styles";

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
  country?: string;
};

function formatCurrency(price: number | string, currency: string): string {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    MXN: "MX$",
  };

  if (isNaN(Number(price))) {
    return price.toString();
  }

  const currencySymbol = currencySymbols[currency] || "";

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(price));

  const numericPart = formattedPrice.replace(/[^\d.,]/g, "");

  return `${currencySymbol}${numericPart}`;
}

export default function EventCard({
  id,
  name,
  date,
  price = "TBD",
  currency,
  imageUrl,
  city,
  venue,
  time,
  country,
}: EventCardProps) {
  const formattedDate = moment(date).format("ll");
  const timeMoment = moment(time, "HH:mm");
  const formattedTime = timeMoment.format("HH:mm");
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  const eventLink = `/events/${id}`;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const favClient = favoritesClient();
  const spotifyClient = new SpotifyClient();

  useEffect(() => {
    const fetchFavorites = async () => {
        const spotifyUserId = await spotifyClient.getUserId();
        const isFav = await favClient.isFav(spotifyUserId, id);
        setIsFavorite(isFav);
        setLoading(false);
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const spotifyUserId = await spotifyClient.getUserId();

      if (isFavorite) {
        favClient.unfav(spotifyUserId, id);
      } else {
        favClient.fav(spotifyUserId, id);
      }

      setIsFavorite((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  if (isMobile) {
    return (
      <Link href={eventLink} passHref style={{ textDecoration: "none" }}>
        <Box sx={boxMobileEventCardStyles}>
          <Card key={id} sx={mobileEventCardStyles}>
            <CardMedia
              sx={mobileEventCardMediaStyles}
              image={imageUrl}
              title={name}
            >
              <IconButton sx={mobileEventCardFavoriteButtonStyles} onClick={toggleFavorite}>
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </CardMedia>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                gutterBottom
                variant="PARAGRAPH_M_BOLD"
                component="div"
                sx={{ color: "text.primary" }} >
                {name}
              </Typography>
              <Typography
                variant="PARAGRAPH_S"
                noWrap
                sx={{ color: "text.secondary", marginTop: "6px" }}
              >
                {formattedDate} · {formattedTime}
              </Typography>
              <Typography
                variant="PARAGRAPH_S"
                sx={{ color: "text.secondary", marginTop: "6px" }}
              >
                {city} · {venue} {country}
              </Typography>
              <Typography
                variant="PARAGRAPH_M_BOLD"
                sx={mobileEventCardPriceStyles}
              >
                {formatCurrency(price, currency)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Link>
    );
  }

  return (
    <Link href={eventLink} passHref style={{ textDecoration: "none" }}>
      <Card key={id} sx={eventCardStyles}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={eventCardMediaStyles}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="PARAGRAPH_M_BOLD"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                maxWidth: "530px",
              }}>
              {name}
            </Typography>
            <Typography
              variant="PARAGRAPH_S"
              noWrap
              sx={{ color: "text.secondary", marginTop: "6px" }}
            >
              {formattedDate}
            </Typography>
            <Typography
              variant="PARAGRAPH_S"
              noWrap
              sx={{ color: "text.secondary", marginTop: "6px" }}
            >
              {formattedTime}
            </Typography>
            <Typography
              variant="PARAGRAPH_S"
              noWrap
              sx={{
                color: "text.secondary",
                marginTop: "6px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                maxWidth: "520px",
              }}
            >
              {city} · {venue} {country}
            </Typography>


          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Typography variant="PARAGRAPH_M_BOLD" sx={eventCardPriceStyles}>
              {formatCurrency(price, currency)}
            </Typography>
            <IconButton
              aria-label="add to favorites"
              onClick={toggleFavorite}
            >
              {isFavorite ? <FavoriteIcon sx={{ color: "pink.4" }} /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
