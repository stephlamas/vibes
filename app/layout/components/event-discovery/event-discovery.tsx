import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { subtitleTypography } from './styles/event-discoverty.styles';
import SpotifyClient from '../SpotifyClient';
import EventCard from '../event-card/event-card';

interface Event {
  id: string;
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
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${artist.name}&apikey=${process.env.NEXT_PUBLIC_TM_API_KEY}`)
          .then(response => response.json())
          .catch(err => console.error(err))
      );

      Promise.all(eventsPromises)
        .then(eventsArrays => {
          const allEvents = eventsArrays.flatMap(e => e?._embedded?.events ?? []);
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
          <Typography variant="PARAGRAPH_XS" sx={subtitleTypography}>
            {events.length} events found
          </Typography>
          {events.map((event) => (
            <EventCard
              key={event.id}
              name={(event as any).name}
              date={(event as any).dates.start.localDate}
              price={(event as any).priceRanges?.[0]?.min}
              currency={(event as any).priceRanges?.[0]?.currency}
              imageUrl={(event as any).images?.[4]?.url}
              city={(event as any)._embedded?.venues?.[0]?.city?.name}
              />
          ))}

        </>
      )}
    </>
  );
}
