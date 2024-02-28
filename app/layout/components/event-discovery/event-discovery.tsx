import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { subtitleTypography } from './styles/event-discoverty.styles';
import SpotifyClient from '../../../../core/clients/spotify-client';
import EventCard from '../event-card/event-card';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  imageUrl: string;
  city: string;
  venue: string;
  images: any[];
  _embedded: any;
  [key: string]: any;
}

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  images: any[];
};

export function EventDiscovery() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const spotifyClient = new SpotifyClient();

    spotifyClient
      .getTopItems("artists")
      .then((data) => {
        setTopArtists(data.items);
        setTotalPages(Math.ceil(data.items.length / PAGE_SIZE));
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (topArtists.length) {
      const eventsPromises = topArtists.map((artist) =>
        fetch(`/api/events?artistName=${encodeURIComponent(artist.name)}`)
          .then(response => response.json())
          .catch(err => console.error(err))
      );

      Promise.all(eventsPromises)
        .then(eventsArrays => {
          const allEvents = eventsArrays.flatMap(e => e?._embedded?.events ?? []);
          const startDate = (evt: any) => new Date(evt.dates.start.localDate) as Date;
          const sortEvents = (e1: any, e2: any) => (startDate(e1) > startDate(e2) ? 1 : -1) as number
          allEvents.sort(sortEvents);
          setEvents(allEvents);
        })
        .catch(console.error);
    }
  }, [topArtists]);

  const PAGE_SIZE = 20;

  const getCurrentPageEvents = () => {
    const startIndex = currentPage * PAGE_SIZE;
    return events.slice(startIndex, startIndex + PAGE_SIZE);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        Upcoming events for you
      </Typography>
      <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
        Based on your favorite artists
      </Typography>
      {events && events.length > 0 && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
            {getCurrentPageEvents().map((event, index) => (
              <EventCard
                id={event.id}
                key={index}
                name={event.name}
                time={event.dates?.start?.localTime}
                date={event.dates?.start?.localDate}
                price={event.priceRanges?.[0]?.min}
                currency={event.priceRanges?.[0]?.currency}
                imageUrl={event.images?.[8]?.url}
                city={event._embedded?.venues?.[0]?.city?.name}
                venue={event._embedded?.venues?.[0]?.name}
                country={event._embedded?.venues?.[0]?.country?.name}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 8 }}>
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              style={{ color: currentPage === 0 ? "gray" : "black" }}
            >
              Previous
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              style={{ color: currentPage >= totalPages - 1 ? "gray" : "black", marginLeft: '8px' }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </>
  )
};
