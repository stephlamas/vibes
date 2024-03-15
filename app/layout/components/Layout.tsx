import React from "react";
import { Box } from "@mui/material";
import Header from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { layoutBoxStyles, contentStyles } from "./styles/Layout.styles";


export function Layout({ children }: { children: React.ReactNode }) {
    return (
    <Box sx={layoutBoxStyles}>
      <Header />
      <Box sx={contentStyles}>
        <Sidebar />
       { children }
      </Box>
    </Box>
  );
};