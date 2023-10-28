import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, Avatar, ListItemText } from "@mui/material";
import SpotifyClient from "../SpotifyClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMicrophoneLines, faCalendar } from '@fortawesome/free-solid-svg-icons';

export function Sidebar() {
    const [data, setData] = useState<any>({} as any);

    useEffect(() => {

        console.error('Lets work!');
    
        const client = new SpotifyClient();
    
        client.call("/me")
          .then(j => setData(j));
    
      }, []);
  
    const user = {
      name: data.display_name,
      imageUrl: data.images && data.images[0] ? data.images[0].url : null,
    };
  
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', minHeight: '100vh', fontFamily: 'Montserrat' }}
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
  