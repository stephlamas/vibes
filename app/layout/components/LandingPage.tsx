'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Typography from '@mui/material/Typography';
import { landingContainerStyle, landingBoxStyle, vibesBoxStyle, loginBoxStyle } from '../styles/LandingPage.style';
import { Grid } from '@mui/material';

const LandingContainer = styled(Grid)({});
const LandingBox = styled(Grid)({});
const LoginBox = styled('div')({});

export function LandingPage() {
  return (
    <LandingContainer sx={landingContainerStyle} container justifyContent="center">
      <LandingBox sx={vibesBoxStyle} item xs={12} sm={6} md={6} lg={2}>
        <Typography variant="HEADLINE_L">VIBES</Typography>
      </LandingBox>
      <LandingBox sx={landingBoxStyle} item xs={12} sm={6} md={6} lg={2} justifyContent="center" alignItems="center">
        <Typography variant="TITLE_S">
        <LoginBox sx={loginBoxStyle}>
          <FontAwesomeIcon icon={faSpotify} size='2x' style={{ marginRight: '.2em' }} />Login with Spotify
        </LoginBox>
        </Typography>
      </LandingBox>
    </LandingContainer>
  );
}