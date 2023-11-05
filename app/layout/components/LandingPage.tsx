"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import Typography from "@mui/material/Typography";
import {
  landingContainerStyle,
  landingBoxStyle,
  vibesBoxStyle,
  loginBoxStyle,
} from "../styles/LandingPage.style";
import { Grid, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";


const LandingContainer = styled(Grid)({});
const LandingBox = styled(Grid)({});
const LoginBox = styled("div")({});

export function LandingPage() {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-top-read',
  ].join(' ');


  const handleLoginButton = () => {
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    window.location.href = spotifyAuthUrl;
  };
  return (
    <LandingContainer
      sx={landingContainerStyle()}
    >
      <LandingBox sx={vibesBoxStyle} item xs={6} sm={6} md={6} lg={2}>
        <Typography variant="HEADLINE_L">VIBES</Typography>
      </LandingBox>
      <LandingBox sx={landingBoxStyle} item xs={6} sm={6} md={6} lg={2}>
        <LoginBox sx={loginBoxStyle}>
          <Typography variant="TITLE_XS">
            <Link onClick={handleLoginButton}>
              <FontAwesomeIcon
                icon={faSpotify}
                size="2x"
                style={{ marginRight: ".2em" }}
              />
              Login with Spotify
            </Link>
          </Typography>
        </LoginBox>
      </LandingBox>
    </LandingContainer>
  );
}