import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { bottomNavStyles } from "./styles/bottom-nav.styles";
import { FireIcon } from "../icons/navigation/Fire";
import { EventsIcon } from "../icons/navigation/My-events";
import { ArtistsIcon } from "../icons/navigation/Artists";
import Link from "next/link";
export function BottomNav() {
  return (
    <BottomNavigation showLabels sx={bottomNavStyles}>
      <Link href="/events" passHref>
        <BottomNavigationAction
          icon={<FireIcon />}
          label="events"
          value="events"
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
