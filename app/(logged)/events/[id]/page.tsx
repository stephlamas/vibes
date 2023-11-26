'use client';
import { useEffect, useState } from 'react';
import { getEventById } from '@/core/services/events-service';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function formatCurrency(price: number | string, currency: string): string {
    const currencySymbols: Record<string, string> = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        CAD: "C$",
        AUD: "A$",
        MXN: "MX$",
    };

    if (isNaN(Number(price))) {
        return price.toString();
    }

    const currencySymbol = currencySymbols[currency] || "";

    const formattedPrice = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(price));

    const numericPart = formattedPrice.replace(/[^\d.,]/g, "");

    return `${currencySymbol}${numericPart}`;
}

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
                        <Typography variant="PARAGRAPH_S">
                            {formatCurrency(eventData.priceRanges?.[0]?.min, eventData.priceRanges?.[0]?.currency)}
                        </Typography>
                        <Typography variant="PARAGRAPH_S">{eventData._embedded?.venues?.[0]?.city?.name}</Typography>
                        <Typography variant="PARAGRAPH_S">{eventData._embedded?.venues?.[0].name}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}