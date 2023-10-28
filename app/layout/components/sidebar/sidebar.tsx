import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMicrophoneLines, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { sidebarListStyles } from "./styles/sidebar.styles";
import { Theme } from "@mui/material/styles";
import { BottomNav } from "../bottom-nav/bottom-nav";

export function Sidebar() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <BottomNav />
    );
  }

  return (
    <List
      sx={sidebarListStyles}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
          <FontAwesomeIcon icon={faHouse} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_S">Home</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
          <FontAwesomeIcon icon={faCalendar} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_S">I'm in</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ color: "darkGray" }}>
          <FontAwesomeIcon icon={faMicrophoneLines} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="PARAGRAPH_S">Past shows</Typography>
        </ListItemText>
      </ListItemButton>
    </List>
  );
}
