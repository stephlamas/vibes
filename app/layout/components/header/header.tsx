"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
import { deleteAllCookies, redirectTo } from "@/core/helpers/cookies/cookie-service";



function deleteCookies() {
  const deleteCookie = (name: any) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}


const Header = () => {
  const [data, setData] = useState<any>({} as any);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const spotifyClient = new SpotifyClient();

  useEffect(() => {
    spotifyClient.call("/me").then((j) => setData(j));
  }, []);

  const settings = ["Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  type Actions = {
    [key: string]: () => void;
  };

  const actions: Actions = {
    Logout: () => {
      deleteAllCookies();
      redirectTo("/");
      handleCloseUserMenu();
    },
  };

  const handleMenuClick = (setting: string) => {
    const action = actions[setting];
    if (action) {
      action();
    } else {
      console.error(`No action defined for setting: ${setting}`);
    }
    handleCloseUserMenu();
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
          <Typography variant="PARAGRAPH_S_BOLD" sx={boxTypographyStyles}>
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
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                <Typography textAlign="center" variant='PARAGRAPH_XS'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
