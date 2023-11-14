import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { subtitleTypography } from './styles/event-discoverty.styles';
import SpotifyClient from '../SpotifyClient';
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

  useEffect(() => {
    const spotifyClient = new SpotifyClient();

    spotifyClient
      .getTopItems("artists")
      .then((data) => {
        setTopArtists(data.items);
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
          const startDate = (evt : any) => new Date(evt.dates.start.localDate) as Date;
          const sortEvents = (e1 : any, e2 : any) => (startDate(e1) > startDate(e2) ? 1 : -1) as number
          allEvents.sort(sortEvents);
          setEvents(allEvents);
        })
        .catch(console.error);
    }
  }, [topArtists]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        Upcoming shows for you
      </Typography>
      <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
        Based on your favorite artists
      </Typography>
      {events && events.length > 0 && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
            {events.map((event) => (
              <EventCard
                id={event.id}
                key={event.id}
                name={event.name}
                time={event.dates.start.localTime}
                date={event.dates.start.localDate}
                price={event.priceRanges?.[0]?.min}
                currency={event.priceRanges?.[0]?.currency}
                imageUrl={event.images?.[8]?.url}
                city={event._embedded?.venues?.[0]?.city?.name}
                venue={event._embedded?.venues?.[0].name}
              />
            ))}
          </Box>
        </>
      )}
    </>
  )
};
