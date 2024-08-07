declare module '@mui/material/Typography' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TypographyPropsVariantOverrides {
      HEADLINE_XXL: true;
      HEADLINE_XL: true;
      HEADLINE_L: true;
      HEADLINE_M: true;
      HEADLINE_S: true;
      TITLE_XL: true;
      TITLE_L: true;
      TITLE_M: true;
      TITLE_S: true;
      TITLE_XS: true;
      PARAGRAPH_XL: true;
      PARAGRAPH_L: true;
      PARAGRAPH_L_BOLD: true;
      PARAGRAPH_M: true;
      PARAGRAPH_M_BOLD: true;
      PARAGRAPH_S: true;
      PARAGRAPH_S_BOLD: true;
      PARAGRAPH_XS: true;
      PARAGRAPH_XS_BOLD: true;
    }
  }
  
  export const createTypography = () => {
    return {
      HEADLINE_XXL: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '80px',
        lineHeight: '84px',
      },
      HEADLINE_XL: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '60px',
        lineHeight: '72px',
      },
      HEADLINE_L: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '48px',
        lineHeight: '60px',
      },
      HEADLINE_M: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '40px',
        lineHeight: '52px',
      },
      HEADLINE_S: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '36px',
        lineHeight: '44px',
      },
      TITLE_XL: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 400,
        fontSize: '28px',
        lineHeight: '36px',
      },
      TITLE_L: {
        fontFamily: ['Space mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '32px',
      },
      TITLE_M: {
        fontFamily: ['Space mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: '28px',
      },
      TITLE_S: {
        fontFamily: ['Space mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
      },
      TITLE_XS: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        width: '100%',
      },
      PARAGRAPH_XL: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 300,
        fontSize: '21px',
        lineHeight: '28px',
      },
      PARAGRAPH_L: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 300,
        fontSize: '18px',
        lineHeight: '24px',
      },
      PARAGRAPH_L_BOLD: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '24px',
      },
      PARAGRAPH_M: {
        fontFamily: ['Space mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
      },
      PARAGRAPH_M_BOLD: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
      },
      PARAGRAPH_S: {
        fontFamily: ['Space mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
      },
      PARAGRAPH_S_BOLD: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
      },
      PARAGRAPH_XS: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
      },
      PARAGRAPH_XS_BOLD: {
        fontFamily: ['Space Mono', 'Roboto', 'sans-serif'].join(','),
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '18px',
      },
    };
  };
  