"use client";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getEventByArtist } from "@/core/services/events-service";
import EventCard from "@/app/layout/components/event-card/event-card";


export default function ArtistEvents({ params }: { params: { artist: string } }) {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const artistName = decodeURIComponent(params.artist);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEventByArtist(artistName);
                setEvents(res._embedded.events);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [params.artist]);

    const PAGE_SIZE = 10;

    const skeleton = Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Box key={index} sx={{ mt: 2, width: '100%' }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '20px' }} />
        </Box>
    ))

    return (
        <Container>
            <Typography variant="TITLE_S">Upcoming events by {artistName}</Typography>
            {isLoading ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
                    {skeleton}
                </Box>
            ) : events && events.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
                    {events.map((event: any, index: any) => (
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
            ) : (
                <Typography variant="PARAGRAPH_S">No events found for {artistName}</Typography>
            )}
        </Container>
    );
}