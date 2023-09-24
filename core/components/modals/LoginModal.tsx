import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onLoginWithSpotify: () => void;
  onSignupWithSpotify: () => void;
}

export function LoginModal({ isOpen, onClose, mode, onLoginWithSpotify, onSignupWithSpotify }: LoginModalProps) {
  const style = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    p: 4,
  };

  const modalTitle = mode === 'login' ? 'Log in with Spotify' : 'Sign up with Spotify';
  const modalDescription =
    mode === 'login'
      ? 'By clicking ' + modalTitle + ', you will log in to our service using your Spotify account.'
      : 'By clicking ' +
        modalTitle +
        ', you will grant our application access to your Spotify account. This will allow us to personalize your experience and provide you with relevant content. You can revoke this access at any time in your Spotify account settings.';

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalDescription}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          {mode === 'login' ? (
            <Button variant="contained" color="primary" onClick={onLoginWithSpotify}>
              Login with Spotify
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={onSignupWithSpotify}>
              Sign up with Spotify
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
