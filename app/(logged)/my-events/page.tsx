"use client";
import { Box, Container, Typography } from "@mui/material";
import { subtitleTypography } from "./styles/my-events.styles";
import SpotifyClient from "@/core/clients/spotify-client";
import allFavoritesClient from "@/core/clients/all-favorites-client";
import { useEffect, useState } from "react";
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

    const getFavs = allFavoritesClient();
    const spotifyClient = new SpotifyClient();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const spotifyUserId = await spotifyClient.getUserId();
                const favorites = await getFavs.allFav(spotifyUserId);
                setFavoriteEvents(favorites);
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

    const mappedEventData = eventData
        .filter((event: { name: string; }) => event.name !== undefined)
        .map((event: Event, index: any) => {
            return {
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
            };
        });

    return (
        <>
            <Typography variant="TITLE_S" component="h1">
                My Events
            </Typography>
            <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
                Saved events
            </Typography>
            <Typography>
                List:
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {mappedEventData.map((event: Event, index) => (
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
                </Box>
            </Typography>   
        </>
    );
}