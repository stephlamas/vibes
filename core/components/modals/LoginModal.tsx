import React from 'react';
import { GenericModal } from './GenericModal';
import { Button, Typography } from '@mui/material';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onLoginWithSpotify: () => void;
  onSignupWithSpotify: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  mode,
  onLoginWithSpotify,
  onSignupWithSpotify,
}: LoginModalProps) {
  const modalTitle = mode === 'login' ? 'Log in with Spotify' : 'Sign up with Spotify';

  const modalDescription =
    mode === 'login'
      ? 'By clicking ' + modalTitle + ', you will log in to our service using your Spotify account.'
      : 'By clicking ' +
        modalTitle +
        ', you will grant our application access to your Spotify account. This will allow us to personalize your experience and provide you with relevant content. You can revoke this access at any time in your Spotify account settings.';

  const buttons = (
    <>
      {mode === 'login' ? (
        <Button variant="primary" onClick={onLoginWithSpotify}>
          Login with Spotify
        </Button>
      ) : (
        <Button variant="primary" onClick={onSignupWithSpotify}>
          Sign up with Spotify
        </Button>
      )}
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </>
  );

  return (
    <GenericModal
      open={isOpen}
      onClose={onClose}
      title={modalTitle}
      footerContent={buttons}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {modalDescription}
      </Typography>
    </GenericModal>
  );
}
