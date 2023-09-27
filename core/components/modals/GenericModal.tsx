import React, { ReactNode } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

const glassmorphismColor = 'rgba(255, 255, 255, 0.2)';

const modalBoxStyles = {
  width: '80%',
  maxWidth: 400,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: glassmorphismColor,
  borderRadius: '12px',
  backdropFilter: 'blur(40px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const modalTitleStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
};

const modalFooterStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: '2px',
  padding: '24px',
  borderRadius: '0 0 12px 12px',
};

export function GenericModal({
  open,
  onClose,
  title,
  children,
  footerContent,
}: GenericModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalBoxStyles}>
        <Box sx={modalTitleStyles}>
          <Typography id="modal-title" variant="TITLE_S" component="h2">
            {title}
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography
            id="modal-description"
            variant="PARAGRAPH_S"
            sx={{ mt: 2, padding: '24px', color: 'neutral.7' }}
          >
            {children}
          </Typography>
        </Box>
        <Box sx={modalFooterStyles}>{footerContent}</Box>
      </Box>
    </Modal>
  );
}
