import { createTypography } from "@/core/theme/typography";

const { TITLE_S } = createTypography();

export const landingContainerStyle = { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: TITLE_S.fontFamily }

export const landingBoxStyle = {
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: '8px',
    padding: '2em',
  }