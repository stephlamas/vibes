"use client";
import { Typography } from "@mui/material";
import { subtitleTypography } from "./styles/my-events.styles";

export default function MyEvents() {
    return (
        <>
            <Typography variant="TITLE_S" component="h1">
                My Events
            </Typography>
            <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
                Saved events
            </Typography>
        </>
    );
}