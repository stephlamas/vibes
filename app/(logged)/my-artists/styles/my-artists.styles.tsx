import { useMediaQuery, useTheme } from '@mui/material';

export const artistsMainBoxStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    return {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row", 
      alignItems: "flex-start", 
      justifyContent: isMobile ? "center" : "flex-start",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(10),
      maxWidth: '100%',
    };
};

export const artistCardStyles = { 
    width: '200px',
    flex: '0 0 auto',
    display: 'flex', 
    justifyContent: 'center',
    '&:hover': {
        transform: 'scale(1.1)',
        transition: 'transform 0.2s ease-in-out'
    }
}
