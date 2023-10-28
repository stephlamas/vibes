import { SvgIcon } from '@mui/material';

export function HomeIcon() {
  return (
    <SvgIcon sx={{ p: 0, width: '32px', height: '32px' }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="custom-icon"
      >
        <path 
            d="M19 7.90637V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V7.90637M2 10.0001L10.8531 3.80297C11.5417 3.32092 12.4583 3.32092 13.1469 3.80297L22 10.0001" 
            stroke="#000000" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
