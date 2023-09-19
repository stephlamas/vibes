import { createTheme } from '@mui/material';
import { createTypography } from './typography';
import { createComponents } from './components';
import { createPalette } from './palette';

const typography = createTypography();

const theme = createTheme({
    typography: typography as any,
    components: createComponents() as any,
    palette: createPalette() as any,
});

export default theme;