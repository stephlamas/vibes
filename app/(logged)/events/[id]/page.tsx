'use client';
import { useEffect, useState } from 'react';
import { getEventById } from '@/core/services/events-service';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function EventPage({ params }: any) {
    const [eventData, setEventData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEventById(params.id);
                setEventData(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <Box>
            {eventData && (
                <Box>
                    {eventData.images && eventData.images.length > 0 && (
                        <Box
                            sx={{
                                backgroundImage: `url(${eventData.images[5].url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                                height: { xs: '250px', md: '500px' },
                                width: '100%',
                                borderRadius: '18px',
                            }}
                        />
                    )}

                    <Box>
                        <Typography variant="TITLE_S">{eventData.name}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="PARAGRAPH_S">{eventData?.dates?.start?.localDate}</Typography>
                        <Typography variant="PARAGRAPH_S">{eventData?.dates?.start?.localTime}</Typography>
                        <Typography variant="PARAGRAPH_S">{eventData.priceRanges?.[0]?.min}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
