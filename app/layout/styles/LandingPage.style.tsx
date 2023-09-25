import { createTypography } from "@/core/theme/typography";
import { createPalette } from "@/core/theme/palette";

const { TITLE_XS, HEADLINE_L } = createTypography();
const { pink, peach } = createPalette();

export const landingContainerStyle = {  minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' };

export const vibesBoxStyle = {
    ...HEADLINE_L, 
    width: '200px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '2em',
  }

  export const landingBoxStyle = {
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '2em',
    position: 'relative', 
    background: `linear-gradient(135deg, ${peach['1']} 0%, ${pink['5']}  100%)`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(3000px)',
  };

  export const loginBoxStyle = {
    ...TITLE_XS,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.25)',
    cursor: 'pointer',
    padding: '1em',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '.5em',
    width: '100%',
  };
  