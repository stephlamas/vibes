import { createPalette } from '../palette';

const { neutral } = createPalette();

export const MuiModal = {
  styleOverrides: {
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: `${neutral[4]}`,
      border: `1px solid ${neutral[4]}`,
      boxShadow: '0px 8px 8px 0px rgba(0, 0, 0, 0.16)',
      borderRadius: '12px',
      width: '560px',
      maxHeight: '640px',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
};