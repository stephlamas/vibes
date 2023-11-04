import { useMediaQuery, useTheme } from '@mui/material';

export const useArtistsMainBoxStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    return {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      mb: isMobile ? theme.spacing(10) : 0,
    };
  };

export const artistCardStyles = { 
    width: '200px', 
    display: 'flex', 
    justifyContent: 'center',
    '&:hover': {
        transform: 'scale(1.1)',
        transition: 'transform 0.2s ease-in-out'
    }
}