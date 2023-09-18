'use client';

import theme from "@/core/theme";
import { ThemeProvider } from '@mui/material';
import { ReactNode } from "react";
import { LandingPage } from "./LandingPage";
export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
      { children }
    </ThemeProvider>
  );
}