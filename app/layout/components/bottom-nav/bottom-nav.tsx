import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { bottomNavStyles } from "./styles/bottom-nav.styles";
import { HomeIcon } from "../icons/sidebar/Home";
import { EventsIcon } from "../icons/sidebar/Events";
import { ArtistsIcon } from "../icons/sidebar/Artists";
import Link from "next/link";
export function BottomNav() {
  return (
    <BottomNavigation showLabels sx={bottomNavStyles}>
      <Link href="/home" passHref>
        <BottomNavigationAction
          icon={<HomeIcon />}
          label="Home"
          value="home"
        />
      </Link>

      <Link href="/my-events" passHref>
        <BottomNavigationAction
          icon={<EventsIcon />}
          label="My events"
          value="my-events"
        />
      </Link>

      <Link href="/my-artists" passHref>
        <BottomNavigationAction
          icon={<ArtistsIcon />}
          label="My artists"
          value="my-artists"
        />
      </Link>
    </BottomNavigation>
  );
}
