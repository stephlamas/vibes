import React from "react";
import Header from "../layout/components/header/header";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box, Grid } from "@mui/material";
import Footer from "../layout/components/footer/footer";

export default function Logged({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                overflow: 'hidden'
            }}
        >
            <Header />
            <Grid container sx={{ flex: 1 }}>
                <Grid item xs={12} lg={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Box>
                        {children}
                    </Box>
                </Grid>
            </Grid>
            <Box
                component="footer"
                sx={{
                    pb: 0,
                    mb: 0,
                    bottom: 0,
                    mt: 8,
                    height: "160px",
                    backgroundColor: "#efefef",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    zIndex: 2,
                    width: '100%',
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
}
