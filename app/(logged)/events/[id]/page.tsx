'use client';
import { useEffect, useState } from 'react';
import { getEventById } from '@/core/services/events-service';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import moment from "moment";
import { LocationIcon } from '@/app/layout/components/icons/events/Location';
import { CashIcon } from '@/app/layout/components/icons/events/Cash';
import { TicketIcon } from '@/app/layout/components/icons/events/Ticket';
import { TicketmasterIcon } from '@/app/layout/components/icons/events/Ticketmaster';

function formatCurrency(price: number | string | undefined, currency: string): string {
    const currencySymbols: Record<string, string> = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        CAD: "C$",
        AUD: "A$",
        MXN: "MX$",
    };

    if (isNaN(Number(price))) {
        return price ? price.toString() : "";
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
    const date = eventData?.dates?.start?.localDate;
    const formattedDate = moment(date).format("ll");
    const time = eventData?.dates?.start?.localTime;
    const timeMoment = moment(time, "HH:mm");
    const formattedTime = timeMoment.format("HH:mm");

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
                        <Typography variant="TITLE_S" mt={2} mb={2}>{eventData.name}</Typography>
                        <Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <TicketIcon />
                                <Box>
                                    <Typography variant="PARAGRAPH_S_BOLD" mb={1}>Tickets</Typography>
                                    <Typography variant="PARAGRAPH_S" mb={1}><TicketmasterIcon />{eventData.url}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="PARAGRAPH_S" mb={1}>{formattedDate}</Typography>
                            <Typography variant="PARAGRAPH_S" mb={1}>{formattedTime}</Typography>
                            <Typography variant="PARAGRAPH_S" mb={1}>
                                {formatCurrency(eventData?.priceRanges?.[0]?.min, eventData?.priceRanges?.[0]?.currency)}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                <LocationIcon />
                                <Box>
                                    <Typography variant="PARAGRAPH_S_BOLD" component="div" sx={{ mb: 0 }}>
                                        {eventData._embedded?.venues?.[0].name}
                                    </Typography>
                                    <Typography variant="PARAGRAPH_S">
                                        {eventData._embedded?.venues?.[0]?.city?.name}
                                        {console.log(eventData)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}