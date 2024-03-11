"use client";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { sidebarListStyles, sidebarLinkStyles } from "./styles/sidebar.styles";
import { Theme } from "@mui/material/styles";
import { BottomNav } from "../bottom-nav/bottom-nav";
import { FireIcon } from "../icons/navigation/Fire";
import { EventsIcon } from "../icons/navigation/My-events";
import { ArtistsIcon } from "../icons/navigation/Artists";
import { InfoIcon } from "../icons/navigation/Info";
import Link from "next/link";

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
      <Link href="/events" passHref style={sidebarLinkStyles}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "darkGray" }}>
            <FireIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="PARAGRAPH_M">
              Upcoming events
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Link>

      <Link href="/my-events" passHref style={sidebarLinkStyles}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "darkGray" }}>
            <EventsIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="PARAGRAPH_M">My events</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>

      <Link href="/my-artists" passHref style={sidebarLinkStyles}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "darkGray" }}>
            <ArtistsIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="PARAGRAPH_M">My artists</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
      <Link href="/about" passHref style={sidebarLinkStyles}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "darkGray" }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="PARAGRAPH_M">About</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </List>
  );
}
