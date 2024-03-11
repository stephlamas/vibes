import { Container, Box, Typography } from "@mui/material";

export default function AboutVibes() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}>
                <Typography variant="TITLE_S" component="h1" mb={3}>About</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>
                    <strong>🚀 Vibes</strong> is a web application that provides users with personalized event suggestions based on their music preferences.
                </Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>🌟 It's a <strong>Next.js</strong>-powered web application that utilizes <strong>Material-UI</strong> for its styling.</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>🎶 Users log in with their Spotify accounts and simultaneously, the app connects to Ticketmaster for <strong>real-time event data</strong>.</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>💡 By merging <strong>Spotify</strong> and <strong>Ticketmaster APIs</strong>, the app generates event suggestions tailored to each user's music taste.</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>📦 The backend features a persistence layer, enabling functionalities such as saving and removing favorite events. These events are stored in "My Events" section and managed by a <strong>Dockerized MongoDB</strong> setup.</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>🎸 My Artists feature allows users to see upcoming events for their <strong>top artists</strong>, based on their Spotify listening history.</Typography>
                <Typography variant="PARAGRAPH_M" sx={{ display: 'inline-block' }}>🛠️ Made with 💖 by <strong>Estefanía Lamas</strong>.</Typography>
            </Box>
        </Container>
    );
}
