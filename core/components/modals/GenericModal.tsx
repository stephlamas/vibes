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

const modalBoxStyles = {
  width: '80%',
  maxWidth: 400,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '12px',
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
  mt: 2,
  backgroundColor: 'neutral.2',
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
            sx={{ mt: 2, padding: '24px' }}
          >
            {children}
          </Typography>
        </Box>
        <Box sx={modalFooterStyles}>{footerContent}</Box>
      </Box>
    </Modal>
  );
}
