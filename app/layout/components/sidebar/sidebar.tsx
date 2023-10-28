import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, Avatar, ListItemText } from "@mui/material";
import SpotifyClient from "../SpotifyClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMicrophoneLines, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { sidebarListStyles } from "./styles/sidebar.styles";

export function Sidebar() {
    const [data, setData] = useState<any>({} as any);

    useEffect(() => {

    
        const client = new SpotifyClient();
    
        client.call("/me")
          .then(j => setData(j));
    
      }, []);
  
  
    return (
      <List
        sx={sidebarListStyles}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
          <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
          <FontAwesomeIcon icon={faCalendar} />
          </ListItemIcon>
          <ListItemText primary="I'm in" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
          <FontAwesomeIcon icon={faMicrophoneLines} />
          </ListItemIcon>
          <ListItemText primary="Past shows" />
        </ListItemButton>
      </List>
    );
  }
  