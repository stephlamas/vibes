"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Typography, Skeleton } from '@mui/material';
import SpotifyClient from '@/core/clients/spotify-client';
import allFavoritesClient from '@/core/clients/all-favorites-client';
import { getEventById } from '@/core/services/events-service';
import EventCard from '@/app/layout/components/event-card/event-card';

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

export default function MyEvents() {
    const [favoriteEvents, setFavoriteEvents] = useState<any[]>([]);
    const [eventData, setEventData] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const topRef = useRef<HTMLDivElement>(null);

    const getFavs = allFavoritesClient();
    const spotifyClient = new SpotifyClient();

    const PAGE_SIZE = 10;

    const skeleton = Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Box key={index} sx={{ mt: 2, width: '100%' }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '20px' }} />
        </Box>
    ));

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const spotifyUserId = await spotifyClient.getUserId();
                const favorites = await getFavs.allFav(spotifyUserId);
                setFavoriteEvents(favorites);
                setTotalPages(Math.ceil(favorites.length / PAGE_SIZE));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching favorite events:", error);
            }
        };

        fetchFavorites();
    }, []);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                for (const eventId of favoriteEvents) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const eventDetails = await getEventById(eventId);
                    setEventData(prevEventData => [...prevEventData, eventDetails]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        if (favoriteEvents.length > 0) {
            fetchEventData();
        }
    }, [favoriteEvents]);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        scrollToTop();
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
        scrollToTop();
    };

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "auto", block: "start" });
        }
    };

    const mappedEventData = eventData.map((event: Event) => ({
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        price: event.priceRanges?.[0]?.min,
        currency: event.priceRanges?.[0]?.currency,
        imageUrl: event.images?.[8]?.url,
        city: event._embedded?.venues?.[0]?.city?.name,
        venue: event._embedded?.venues?.[0]?.name,
        country: event._embedded?.venues?.[0]?.country?.name,
        images: event.images,
        _embedded: event._embedded,
        type: event.type,
        url: event.url,
    }));

    const getCurrentPageEvents = () => {
        const startIndex = currentPage * PAGE_SIZE;
        return mappedEventData.slice(startIndex, startIndex + PAGE_SIZE);
    };

    return (
        <Container maxWidth="lg" ref={topRef} >
            {isLoading ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
                    {skeleton}
                </Box>
            ) : eventData && eventData.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}>
                    <Typography variant="TITLE_S" component="h1" mb={3}>My saved events</Typography>
                    {getCurrentPageEvents().map((event: Event, index: number) => (
                        <EventCard
                            key={index}
                            id={event.id}
                            name={event.name}
                            date={event.date}
                            time={event.time}
                            price={event.price}
                            currency={event.currency}
                            imageUrl={event.imageUrl}
                            city={event.city}
                            venue={event.venue}
                            country={event.country}
                        />
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
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
                            style={{ color: currentPage >= totalPages - 1 ? "gray" : "black" }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Typography variant="TITLE_S" component="p" mt={3}>You have no favorite events yet</Typography>
            )}
        </Container>
    );
}
