import { createTheme } from '@mui/material';
import { createTypography } from './typography';

const typography = createTypography();

const theme = createTheme({
    typography: typography as any,
});

export default theme;