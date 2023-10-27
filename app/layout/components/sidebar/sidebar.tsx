import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, Avatar, ListItemText } from "@mui/material";
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SpotifyClient from "../SpotifyClient";

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
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText primary="I'm in" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MicExternalOnIcon />
          </ListItemIcon>
          <ListItemText primary="My past shows" />
        </ListItemButton>
      </List>
    );
  }
  