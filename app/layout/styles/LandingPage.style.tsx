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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '2em',
    position: 'relative', 
    background: `linear-gradient(135deg, ${lavender['2']} 0%, ${peach['1']} 100%)`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  export const loginBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
    padding: '0.5em',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };
  
  
  
  
  
  