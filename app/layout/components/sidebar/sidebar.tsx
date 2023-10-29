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
import { HomeIcon } from "../icons/sidebar/Home";
import { EventsIcon } from "../icons/sidebar/Events";
import { ArtistsIcon } from "../icons/sidebar/Artists";
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
      <Link href="/home" passHref style={sidebarLinkStyles}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "darkGray" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="PARAGRAPH_M">
              Home
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
    </List>
  );
}
