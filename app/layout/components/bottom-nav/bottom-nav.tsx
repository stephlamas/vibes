import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { bottomNavStyles } from "./styles/bottom-nav.styles";
import { HomeIcon } from "../icons/sidebar/Home";
import { EventsIcon } from "../icons/sidebar/Events";
import { ArtistsIcon } from "../icons/sidebar/Artists";

export function BottomNav() {
  return (
    <BottomNavigation
      showLabels
      sx={bottomNavStyles}
    >
      <BottomNavigationAction
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        icon={<EventsIcon />}
      />
      <BottomNavigationAction
        icon={<ArtistsIcon />}
      />
    </BottomNavigation>
  );
}
