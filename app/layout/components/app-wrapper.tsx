'use client';

import theme from "@/core/theme";
import { ThemeProvider } from '@mui/material';
import { ReactNode } from "react";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  );
}