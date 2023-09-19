'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Typography from '@mui/material/Typography';
import { landingContainerStyle, landingBoxStyle, vibesBoxStyle, loginBoxStyle } from '../styles/LandingPage.style';

const LandingContainer = styled('div')({});
const LandingBox = styled('div')({});
const LoginBox = styled('div')({});

export function LandingPage() {
  return (
    <LandingContainer sx={landingContainerStyle}>
      <LandingBox sx={vibesBoxStyle}>
        <Typography variant="HEADLINE_L">VIBES</Typography>
      </LandingBox>
      <LandingBox sx={landingBoxStyle}>
        <Typography variant="TITLE_S">
        <LoginBox sx={loginBoxStyle}>
          <FontAwesomeIcon icon={faSpotify} size='2x' style={{ marginRight: '.2em' }} />Login with Spotify
        </LoginBox>
        </Typography>
      </LandingBox>
    </LandingContainer>
  );
}
