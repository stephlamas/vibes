import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMicrophoneLines,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { bottomNavStyles } from "./styles/bottom-nav.styles";

export function BottomNav() {
  return (
    <BottomNavigation
      showLabels
      sx={bottomNavStyles}
    >
      <BottomNavigationAction
        icon={<FontAwesomeIcon icon={faHouse} />}
      />
      <BottomNavigationAction
        icon={<FontAwesomeIcon icon={faCalendar} />}
      />
      <BottomNavigationAction
        icon={<FontAwesomeIcon icon={faMicrophoneLines} />}
      />
    </BottomNavigation>
  );
}
