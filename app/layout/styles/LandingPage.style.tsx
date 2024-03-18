import { createTypography } from "@/core/theme/typography";

const { TITLE_XS, HEADLINE_L } = createTypography();

export const landingContainerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: "column",
  gap: '3em',
};

export const landingTitleBoxStyle = {
    ...HEADLINE_L,
    width: { xs: '400px', sm: '600px' },
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '2em',
    backgroundImage: 'url(/images/landing-box.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'end',
    backgroundRepeat: 'no-repeat',
};

export const loginBoxStyle = {
  ...TITLE_XS,
  display: 'flex',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.25)',
  cursor: 'pointer',
  padding: '.5em',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: '.5em',
  width: '240px',
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};


