import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FireIcon } from "../icons/navigation/Fire";
import { EventsIcon } from "../icons/navigation/My-events";
import { ArtistsIcon } from "../icons/navigation/Artists";
import Link from "next/link";
import { InfoIcon } from "../icons/navigation/Info";

export function BottomNav() {
  return (
    <BottomNavigation showLabels>
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
      <Link href="/about" passHref>
        <BottomNavigationAction
          icon={<InfoIcon />}
          label="About"
          value="about"
        />
      </Link>
    </BottomNavigation>
  );
}

