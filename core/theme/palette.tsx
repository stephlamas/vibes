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
    pink: {
      '1': '#FFC0CB', // Soft pink
      '2': '#FFA7B5', // Mild pink
      '3': '#FF8E9F', // Slightly darker
      '4': '#FF7589', // A balanced pink
      '5': '#FF5C73', // A bit darker
      '6': '#FF435D', // Richer shade
    },
    fucsia: '#fd3d93',
    black: '#000000',
    white: '#FFFFFF',
    // SECONDARY
    peach: {
      '1': '#FFC3A0', // Soft peach
      '2': '#FFAB71', // Vibrant peach
      '3': '#FF9234', // Strong peach
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
