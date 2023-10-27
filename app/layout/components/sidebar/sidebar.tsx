import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, Avatar, ListItemText } from "@mui/material";
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import SpotifyClient from "../SpotifyClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMicrophoneLines  } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

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
            <Avatar src={user.imageUrl} alt={user.name} />
          </ListItemIcon>
          <ListItemText primary={user.name} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
          <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
          <FontAwesomeIcon icon={faStar} />
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
  