"use client";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { sidebarListStyles } from "./styles/sidebar.styles";
import { Theme } from "@mui/material/styles";
import { BottomNav } from "../bottom-nav/bottom-nav";
import { HomeIcon } from "../icons/sidebar/Home";
import { EventsIcon } from "../icons/sidebar/Events";
import { ArtistsIcon } from "../icons/sidebar/Artists";

export function Sidebar() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  if (isMobile) {
    return <BottomNav />;
  }

  return (
    <List
      sx={sidebarListStyles}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_M">Home</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
          <EventsIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_M">My events</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
        <ArtistsIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_M">My artists</Typography>
        </ListItemText>
      </ListItemButton>
    </List>
  );
}
