import { Typography } from "@mui/material";
import EventCard from "./event-card/event-card";

export function EventDiscovery() {
  return (
    <>
      <Typography variant="TITLE_S" component="h1">
        Upcoming shows for you
      </Typography>
        <Typography variant="PARAGRAPH_XS">
            Based on your favorite artists
        </Typography>
      <EventCard />
    </>
  );
}
