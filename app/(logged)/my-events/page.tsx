"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { subtitleTypography } from "./styles/my-events.styles";
import SpotifyClient from "@/core/clients/spotify-client";
import allFavoritesClient from "@/core/clients/all-favorites-client";
import { useEffect, useRef, useState } from "react";
import { getEventById } from "@/core/services/events-service";
import EventCard from "@/app/layout/components/event-card/event-card";

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
    const topRef = useRef<HTMLDivElement>(null);

    const getFavs = allFavoritesClient();
    const spotifyClient = new SpotifyClient();

    const PAGE_SIZE = 20;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const spotifyUserId = await spotifyClient.getUserId();
                const favorites = await getFavs.allFav(spotifyUserId);
                setFavoriteEvents(favorites);
                setTotalPages(Math.ceil(favorites.length / PAGE_SIZE));
            } catch (error) {
                console.error("Error fetching favorite events:", error);
            }
        };

        fetchFavorites();
    }, []);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventDataPromises = favoriteEvents.map((eventId: string) => getEventById(eventId));
                const eventData = await Promise.all(eventDataPromises);
                setEventData(eventData);  
                console.log('EVENT DATA: ', eventData);
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

    const getCurrentPageEvents = () => {
        const startIndex = currentPage * PAGE_SIZE;
        return eventData.slice(startIndex, startIndex + PAGE_SIZE).map((event: Event) => ({
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
        })).filter(event => 
            Object.values(event)
            .every(value => value !== undefined));
    };
        
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="TITLE_S" component="h1">
                    My Events
                </Typography>
                <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
                    Saved events
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: 0 }} ref={topRef} />
                    {getCurrentPageEvents().map((event: Event, index) => (
                        <Box key={index} sx={{ mt: 2, width: '100%' }}>
                            <EventCard
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
                        </Box>
                    ))}
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
                </Box>
            </Container>
        </>
    );
}