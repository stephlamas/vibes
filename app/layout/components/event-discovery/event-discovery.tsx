import { Typography } from "@mui/material";
import EventCard from "../event-card/event-card";
import { subtitleTypography } from "./styles/event-discoverty.styles";

export function EventDiscovery() {
  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        Upcoming shows for you
      </Typography>
      <Typography variant="PARAGRAPH_S" sx={subtitleTypography}>
            Based on your favorite artists
        </Typography>
      <EventCard />


    </>
  );
}
