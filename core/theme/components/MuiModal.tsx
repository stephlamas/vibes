import { createPalette } from '../palette';

const { neutral } = createPalette();

export const MuiModal = {
  styleOverrides: {
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backdropFilter: 'blur(30px)',
      backgroundColor: `rgba(${neutral[4]}, 0.6)`,
      border: `1px solid rgba(${neutral[4]}, 0.8)`, 
      boxShadow: '0px 8px 8px 0px rgba(0, 0, 0, 0.16)',
      borderRadius: '12px',
      width: '560px',
      maxHeight: '640px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
};