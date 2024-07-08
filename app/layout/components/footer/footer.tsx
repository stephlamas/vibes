"use client";
import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: "#efefef",
                width: '100%',
                height: '100%'
            }}
        >
            <Typography variant="PARAGRAPH_S" align="center" gutterBottom>
                VIBES
            </Typography>
            <Typography
                variant="PARAGRAPH_XS"
                color="text.secondary"
                align="center"
            >
                {'made with <3 by Estefanía Lamas'}
            </Typography>
        </Container>
    );
};

export default Footer;
