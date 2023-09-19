import { createTypography } from "@/core/theme/typography";
import { createPalette } from "@/core/theme/palette";

const { TITLE_S, HEADLINE_L } = createTypography();
const { lavender, peach } = createPalette();

export const landingContainerStyle = { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }

export const vibesBoxStyle = {
    ...HEADLINE_L, 
    width: '200px',
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '2em',
  }

  export const landingBoxStyle = {
    ...TITLE_S,
    width: '300px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '2em',
    background: `linear-gradient(135deg, ${lavender['2']} 0%, ${peach['1']} 100%)`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };
  
  
  
  