import { createTypography } from './typography';

createTypography();

export const createComponents = () => {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          HEADLINE_M: 'h1',
          HEADLINE_S: 'h2',
          TITLE_XL: 'h3',
          TITLE_L: 'h4',
          TITLE_M: 'h5',
          TITLE_S: 'h6',
          TITLE_XS: 'h6',
          PARAGRAPH_XL: 'p',
          PARAGRAPH_L: 'p',
          PARAGRAPH_L_BOLD: 'p',
          PARAGRAPH_M: 'p',
          PARAGRAPH_M_BOLD: 'p',
          PARAGRAPH_M_ITALIC: 'p',
          PARAGRAPH_S: 'p',
          PARAGRAPH_S_BOLD: 'p',
          PARAGRAPH_XS: 'p',
          PARAGRAPH_XS_BOLD: 'p',
        },
      },
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  }
}