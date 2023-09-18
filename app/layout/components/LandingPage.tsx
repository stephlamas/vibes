'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Typography from '@mui/material/Typography';

const LandingContainer = styled('div')({});
const LandingBox = styled('div')({});
import { landingContainerStyle, landingBoxStyle } from '../styles/LandingPage.style';

export function LandingPage() {
  return (
    <LandingContainer
      sx={landingContainerStyle}
    >
      <LandingBox
        sx={landingBoxStyle}
      >
        <Typography variant="TITLE_S">Login with Spotify</Typography>
        <FontAwesomeIcon icon={faSpotify} size='3x'/>
      </LandingBox>
    </LandingContainer>
  );
}
