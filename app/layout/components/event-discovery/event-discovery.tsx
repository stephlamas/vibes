import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Box, Typography, Button, Skeleton, Container } from '@mui/material';
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

const PAGE_SIZE = 20;

export function EventDiscovery() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const spotifyClient = new SpotifyClient();

      try {
        const artistData = await spotifyClient.getTopItems("artists");
        setTopArtists(artistData.items);
        setTotalPages(Math.ceil(artistData.items.length / PAGE_SIZE));

        if (artistData.items.length > 0) {
          const userCountryCode = await spotifyClient.getUserCountryCode();

          const userLocation = await new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                (error) => {
                  console.error('Error getting user location:', error);
                  reject(error);
                }
              );
            } else {
              reject(new Error('Geolocation is not supported'));
            }
          });

          const eventsPromises = artistData.items.map((artist: { name: string | number | boolean; }) =>
            fetch(`/api/events?artistName=${encodeURIComponent(artist.name)}`)
              .then((response) => response.json())
              .catch((err) => console.error(err))
          );

          const eventsArrays = await Promise.all(eventsPromises);
          const allEvents = eventsArrays.flatMap((e) => e?._embedded?.events ?? []);
          const userEvents = allEvents.filter(
            (event) => event._embedded?.venues?.[0]?.country?.countryCode === userCountryCode
          );
          const otherEvents = allEvents.filter(
            (event) => event._embedded?.venues?.[0]?.country?.countryCode !== userCountryCode
          );
          const startDate = (evt: any) => new Date(evt.dates.start.localDate) as Date;
          const sortEvents = (e1: any, e2: any) => (startDate(e1) > startDate(e2) ? 1 : -1) as number;

          const eventsWithinRadius = allEvents.filter((event) => {
            const eventLocation = event._embedded?.venues?.[0]?.location;
            if (!eventLocation) {
              return false;
            }
            const distance = Math.sqrt(
              Math.pow(eventLocation.latitude - userLocation.latitude, 2) +
              Math.pow(eventLocation.longitude - userLocation.longitude, 2)
            );
            return distance < 0.1;
          });

          eventsWithinRadius.sort(sortEvents);
          userEvents.sort(sortEvents);
          otherEvents.sort(sortEvents);
          setEvents([...eventsWithinRadius, ...userEvents, ...otherEvents]);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const skeleton = useMemo(
    () =>
      Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Box key={index} sx={{ mt: 2, width: '100%' }}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '20px' }} />
        </Box>
      )),
    []
  );

  const getCurrentPageEvents = useCallback(() => {
    const startIndex = currentPage * PAGE_SIZE;
    return events.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, events]);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    scrollToTop();
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    scrollToTop();
  };

  const scrollToTop = useCallback(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      ref={topRef}
      sx={{
        ml: { xs: 0, md: 5 },
        p: { xs: 0 },
        mr: { xs: 0 },
      }}
    >
      <Box sx={{ p: 2, ml: 1, mt: 10 }}>
        <Typography variant="TITLE_S" component="h1">
          Upcoming events for you
        </Typography>
        <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
          Based on your favorite artists
        </Typography>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
          {skeleton}
        </Box>
      ) : (
        events &&
        events.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3, mb: 8 }}>
              <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 8 }}>
              <Button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                style={{ color: currentPage === 0 ? 'gray' : 'black' }}
              >
                Previous
              </Button>
              <Button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                style={{ color: currentPage >= totalPages - 1 ? 'gray' : 'black', marginLeft: '8px' }}
              >
                Next
              </Button>
            </Box>
          </>
        )
      )}
    </Container>
  );
}
