"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Typography, Skeleton } from '@mui/material';
import SpotifyClient from '@/core/clients/spotify-client';
import allFavoritesClient from '@/core/clients/all-favorites-client';
import { getEventById } from '@/core/services/events-service';
import EventCard from '@/app/layout/components/event-card/event-card';
import "animate.css";

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
    const [eventData, setEventData] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const topRef = useRef<HTMLDivElement>(null);

    const getFavs = allFavoritesClient();
    const spotifyClient = new SpotifyClient();

    const PAGE_SIZE = 10;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const spotifyUserId = await spotifyClient.getUserId();
                const favorites = await getFavs.allFav(spotifyUserId);
                
                if(favorites.length === 0) {
                    setTotalPages(0);
                    setIsLoading(false);
                    return;
                };

                for (const eventId of favorites) {
                    const eventDetails = await getEventById(eventId);
                    setEventData(prevEventData => {
                        const eventExists = prevEventData.some(event => event.id === eventDetails.id);
                        if (eventExists) {
                            return prevEventData;
                        }
                        return [...prevEventData, eventDetails];
                    });
                }
                setTotalPages(Math.ceil(favorites.length / PAGE_SIZE));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching favorite events:", error);
                throw (error);
            }
        };

        fetchFavorites();
    }, []);

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

    const skeleton = () => {
        return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 10 }}>
            { 
                Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <Box key={index} sx={{ mt: 2, width: '100%' }}>
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '20px' }} />
                    </Box>
                ))            
            }
        </Box>
    }

    const noFavs = () => <Typography variant="TITLE_S" component="p" mt={8} className="animate__animated animate__headShake">You have no favorite events yet</Typography>

    const thereAreFavs = () => {
        return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 10 }}>
            <Typography variant="TITLE_S" component="h1" mb={3} sx={{ p: 2 }}>My saved events</Typography>
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
    }

    const favs = () => eventData && eventData.length > 0 ? thereAreFavs() : noFavs();

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
            {isLoading ?  skeleton() : favs() }
        </Container>
    );
}
