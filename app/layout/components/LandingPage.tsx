'use client';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Typography from '@mui/material/Typography';
import { landingContainerStyle, landingBoxStyle, vibesBoxStyle, loginBoxStyle } from '../styles/LandingPage.style';
import { Grid } from '@mui/material';
import { LoginModal } from '@/core/components/modals/LoginModal';

const LandingContainer = styled(Grid)({});
const LandingBox = styled(Grid)({});
const LoginBox = styled('div')({});

export function LandingPage() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');

  const openLoginModal = (mode: React.SetStateAction<string>) => {
    setModalMode(mode);
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <LandingContainer sx={landingContainerStyle} container justifyContent="center">
      <LandingBox sx={vibesBoxStyle} item xs={12} sm={6} md={6} lg={2}>
        <Typography variant="HEADLINE_L">VIBES</Typography>
      </LandingBox>
      <LandingBox sx={landingBoxStyle} item xs={12} sm={6} md={6} lg={2} justifyContent="center" alignItems="center">
        <Typography variant="TITLE_XS">
          <LoginBox sx={loginBoxStyle} onClick={() => openLoginModal('login')}> {/* Open login modal */}
            <FontAwesomeIcon icon={faSpotify} size='2x' style={{ marginRight: '.2em' }} />Login
          </LoginBox>
        </Typography>
        <Typography variant="TITLE_XS">
          <LoginBox sx={loginBoxStyle} onClick={() => openLoginModal('signup')}> {/* Open signup modal */}
            <FontAwesomeIcon icon={faSpotify} size='2x' style={{ marginRight: '.2em' }} />Signup
          </LoginBox>
        </Typography>
      </LandingBox>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        mode={modalMode as 'login' | 'signup'}
        onLoginWithSpotify={() => {
          closeLoginModal();
        }}
        onSignupWithSpotify={() => {
          closeLoginModal(); 
        }}
      />
    </LandingContainer>
  );
}
