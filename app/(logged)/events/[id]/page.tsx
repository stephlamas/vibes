'use client';
import { useEffect, useState } from 'react';
import { getEventById } from '@/core/services/events-service';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

export default function EventPage({ params }: any) {
    const [eventData, setEventData] = useState({} as any);

    useEffect(() => {
        getEventById(params.id)
            .then(r => setEventData(r))
            .catch(e => console.error('Error: ' + e));
    }, [params.id]);

    return (
        <Box>
            {eventData && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {eventData.images && eventData.images.length > 0 && (
                            <Box
                                sx={{
                                    backgroundImage: `url(${eventData.images[5].url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top',
                                    height: { xs: '250px', md: '500px'},
                                    //height: '250px',
                                    width: '100%',
                                    borderRadius: '10px',
                                }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="TITLE_S">{eventData.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="PARAGRAPH_S">{eventData?.dates?.start?.localDate}</Typography>
                            <Typography variant="PARAGRAPH_S">{eventData?.dates?.start?.localTime}</Typography>
                            <Typography variant="PARAGRAPH_S">{eventData.priceRanges?.[0]?.min}</Typography>

                            {console.log(eventData)}
            

                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
