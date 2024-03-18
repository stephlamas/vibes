"use client";
import { Box, Container, Skeleton, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getEventByArtist } from "@/core/services/events-service";
import EventCard from "@/app/layout/components/event-card/event-card";
import { paginationButtonStyles } from "../../my-artists/styles/my-artists.styles";

export default function ArtistEvents({ params }: { params: { artist: string } }) {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const artistName = decodeURIComponent(params.artist);
    const [totalPages,] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEventByArtist(artistName);
                if (res._embedded && res._embedded.events) {
                    setEvents(res._embedded.events);
                } else {
                    setEvents([]);
                    setTotalPages(0);
                }
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
    ));

    const getCurrentPageEvents = () => {
        const startIndex = currentPage * PAGE_SIZE;
        return events.slice(startIndex, startIndex + PAGE_SIZE);
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(events.length / PAGE_SIZE) - 1));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    return (
        <Container maxWidth="lg">
            {isLoading ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
                    {skeleton}
                </Box>
            ) : events && events.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 10 }}>
                    <Typography variant="TITLE_S" component="h1" mb={3}>Upcoming events by {artistName}</Typography>
                    {getCurrentPageEvents().map((event: any, index: any) => (
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
                    <Box
                        sx={paginationButtonStyles}
                    >
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
                <Typography variant="TITLE_S" component="h1">Oops! No upcoming events found for {artistName}</Typography>
            )}
        </Container>
    );
}
