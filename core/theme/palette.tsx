declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
      lavender: Palette['primary'];
      peach: Palette['primary'];
      feedback: Palette['secondary'];
      shadow: Palette['secondary'];
      hover: Palette['secondary'];
    }
  
    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
      lavender: PaletteOptions['primary'];
      peach: PaletteOptions['primary'];
      feedback: PaletteOptions['secondary'];
      shadow: PaletteOptions['secondary'];
      hover: PaletteOptions['secondary'];
    }
  }
  
  export const createPalette = () => {
    return {
      // NEUTRAL
      neutral: {
        '0': '#FFFFFF',
        '9': '#262836',
        '8': '#46535E',
        '7': '#5D6D78',
        '6': '#82939A',
        '5': '#ACC0C4',
        '4': '#CDDBDE',
        '3': '#E5EFF0',
        '2': '#EEF6F7',
        '1': '#F9FCFC',
      },
      // PRIMARY
      lavender: {
        '1': '#F4E8F4',  // Soft lavender
        '2': '#E3CCE3',  // Mild lavender
        '3': '#D2B0D2',  // Slightly darker
        '4': '#BB94BB',  // A balanced purple
        '5': '#A078A0',  // A bit darker
        '6': '#7B547B',  // Richer shade
      },
      // SECONDARY
      peach: {
        '1': '#FFC3A0',  // Soft peach
        '2': '#FFAB71',  // Vibrant peach
        '3': '#FF9234',  // Strong peach
      },
        // SEMANTIC
        feedback: {
        infoDark: '#003B75',
        infoBase: '#0055A8',
        infoLight: '#CCEAF5',
        cautionDark: '#B37400',
        cautionBase: '#FFA600',
        cautionLight: '#FFF6E5',
        successDark: '#0D725E',
        successBase: '#12A88A',
        successLight: '#EDFBF8',
        errorDark: '#CA110F',
        errorBase: '#EA2238',
        errorLight: '#FEEEEE',
      },
      // Colors for specific elements & actions
      shadow: {
        header: 'rgba(172, 192, 196, 0.3)',
        card: 'rgba(204, 214, 216, 0.5)',
        alertToast: 'rgba(38, 40, 54, 0.1)',
        alertModalDialog: 'rgba(46, 64, 69, 0.15)',
        screenBackgroundWithModalDialog: 'rgba(70, 83, 94, 0.40)',
      },
      hover: {
        navItem: 'rgba(70, 83, 94, 0.50)',
      },
    };
  };
  