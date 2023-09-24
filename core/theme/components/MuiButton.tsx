import { createPalette } from '../palette';
import { createTypography } from '../typography';

const { PARAGRAPH_S } = createTypography();
const { pink, fucsia, black, white } = createPalette(); // Updated color names

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    card: true;
  }
}

const commonStyles = {
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100px',
  ...PARAGRAPH_S,
};

export const MuiButton = {
  styleOverrides: {
    root: {
      ...commonStyles,
    },
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        padding: '6px 12px',
        color: white,
        backgroundColor: black,
        borderRadius: '4px',
        '&:hover': {
            color: white,
            borderColor: pink[3],
            backgroundColor: fucsia,
        },
        '&:active': {
          color: white,
          backgroundColor: fucsia,
        },
        '&:disabled': {
          color: white,
          opacity: 0.5,
          backgroundColor: pink[4],
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        padding: '6px 12px',
        border: '1px solid',
        borderRadius: '4px',
        color: black,
        borderColor: black,
        '&:hover': {
          color: white,
          borderColor: fucsia,
          backgroundColor: fucsia,
        },
        '&:active': {
          color: white,
          borderColor: fucsia,
          backgroundColor: pink[3],
        },
        '&:disabled': {
          color: pink[4],
          borderColor: pink[4],
          backgroundColor: pink[1],
          opacity: 0.5,
        },
      },
    },
    {
      props: { variant: 'card' },
      style: {
        alignSelf: 'stretch',
        gap: '20px',
        backgroundColor: white,
        width: '800px',
        height: '48px',
        padding: '8px 24px',
        border: '1px solid',
        borderRadius: '6px',
        borderColor: black,
        color: black,
      },
    },
  ],
};
