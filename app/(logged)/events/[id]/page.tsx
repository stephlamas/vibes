"use client";
import React, { useEffect, useState } from "react";
import { getEventById } from "@/core/services/events-service";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import { LocationIcon } from "@/app/layout/components/icons/events/Location";
import { TicketIcon } from "@/app/layout/components/icons/events/Ticket";
import { TicketmasterIcon } from "@/app/layout/components/icons/events/Ticketmaster";
import Link from "next/link";
import { EventsIcon } from "@/app/layout/components/icons/navigation/My-events";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SpotifyClient from "@/core/clients/spotify-client";
import favoritesClient from "@/core/clients/favorites-client";

function formatCurrency(
  price: number | string | undefined,
  currency: string,
): string {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    MXN: "MX$",
  };

  if (isNaN(Number(price))) {
    return price ? price.toString() : "";
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

export default function EventPage({ params }: any) {
  const [eventData, setEventData] = useState<any>({});
  const date = eventData?.dates?.start?.localDate;
  const formattedDate = moment(date).format("ll");
  const time = eventData?.dates?.start?.localTime;
  const timeMoment = moment(time, "HH:mm");
  const formattedTime = timeMoment.format("HH:mm");

  const [isFavorite, setIsFavorite] = useState(false);

  const favClient = favoritesClient();
  const spotifyClient = new SpotifyClient();

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const spotifyUserId = await spotifyClient.getUserId();
      e.preventDefault();

      if (isFavorite) {
        favClient.unfav(spotifyUserId, eventData.id);
      } else {
        favClient.fav(spotifyUserId, eventData.id);
      }

      setIsFavorite(prevState => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const event = await getEventById(params.id);
      const spotifyUserId = await spotifyClient.getUserId();
      const isFav = await favClient.isFav(spotifyUserId, event.id);
      setEventData(event);
      setIsFavorite(isFav);
    };
    fetchData();

  }, [params.id]);

  return (
    <Box>
      {eventData && (
        <Box sx={{
          ml: { xs: 0, md: 3 },
          mt: { xs: 10, md: 7 },
          p: { xs: 2, md: 0 },
        }}>
          {eventData.images && eventData.images.length > 0 && (
            <Box
              sx={{
                backgroundImage: `url(${eventData.images[5].url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: { xs: "250px", md: "400px" },
                width: "100%",
                borderRadius: "18px",
              }}
            />
          )}
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" justifyItems="center">
              <Typography variant="TITLE_S" mt={3} mb={3}>
                {eventData.name}
              </Typography>
              <IconButton disableTouchRipple aria-label="add to favorites" onClick={toggleFavorite}>
                {isFavorite ? (
                  <>
                    <Typography variant="PARAGRAPH_S" mr={1} color="neutral.7">
                      Remove
                    </Typography>
                    <FavoriteIcon sx={{ color: "pink.4" }} />
                  </>
                ) : (
                  <>
                    <Typography variant="PARAGRAPH_S" mr={1} color="neutral.7">
                      Save
                    </Typography>
                    <FavoriteBorderIcon />
                  </>
                )}
              </IconButton>
            </Box>

            <Box>
              <Box display="flex" alignItems="start" gap={1}>
                <LocationIcon />
                <Box>
                  <Typography variant="TITLE_XS" mb={1}>
                    {eventData._embedded?.venues?.[0].name}
                  </Typography>
                  <Typography variant="PARAGRAPH_S" mb={3} color="neutral.7">
                    {eventData._embedded?.venues?.[0]?.city?.name} · {eventData._embedded?.venues?.[0]?.state?.name} {eventData._embedded?.venues?.[0]?.country?.name}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="start" gap={1}>
                <EventsIcon />
                <Box>
                  <Typography variant="TITLE_XS" mb={1}>
                    {formattedDate}
                  </Typography>
                  <Typography variant="PARAGRAPH_S" mb={3} color="neutral.7">
                    {formattedTime}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="start" gap={1}>
                <TicketIcon />
                <Box>
                  <Typography variant="TITLE_XS" mb={1}>
                    {" "}
                    {formatCurrency(
                      eventData?.priceRanges?.[0]?.min,
                      eventData?.priceRanges?.[0]?.currency,
                    )}
                  </Typography>
                  {eventData.url ? (
                    <Link
                      href={eventData.url}
                      passHref
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography variant="PARAGRAPH_S" mb={3} p={0.5}>
                        <TicketmasterIcon />
                        <Typography
                          variant="PARAGRAPH_S"
                          style={{ marginLeft: "8px" }}
                          color="neutral.7"
                        >
                          Buy tickets
                        </Typography>
                      </Typography>
                    </Link>
                  ) : (
                    <Typography variant="PARAGRAPH_S" mb={1} color="neutral.7">
                      Ticket information not available.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
