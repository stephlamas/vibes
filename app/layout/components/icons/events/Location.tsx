import React from 'react';
import { SvgIcon } from '@mui/material';

export function LocationIcon() {
    return (
        <SvgIcon sx={{ p: 0, width: '30px', height: '30px' }}>
            <svg
                width="30"
                height="30"
                viewBox="0 0 36 34"
                fill="currentColor"
            >
                <path
                    d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zM16 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </SvgIcon>
    );
}
