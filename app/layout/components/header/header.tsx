"use client"; 
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  appBarStyles,
  toolBarStyles,
  logoTypography,
  boxStyles,
  menuStyles,
  boxTypographyStyles,
} from "./styles/header.styles";
import SpotifyClient from "../SpotifyClient";

const settings = ["Logout"];

export function Header() {
  const [data, setData] = React.useState<any>({} as any);

  React.useEffect(() => {

    const client = new SpotifyClient();

    client.call("/me").then((j) => setData(j));
  }, []);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = {
    name: data.display_name,
    imageUrl: data.images && data.images[0] ? data.images[0].url : null,
  };

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar disableGutters sx={toolBarStyles}>
        <Typography
          variant="TITLE_L"
          noWrap
          component="a"
          href="#appbar"
          sx={logoTypography}
        >
          VIBES
        </Typography>

        <Box sx={boxStyles}>
          <Typography variant='PARAGRAPH_S_BOLD' sx={boxTypographyStyles}>
            {user.name}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={user.imageUrl} alt={user.name} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={menuStyles}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
