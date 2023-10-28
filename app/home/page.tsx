import React from "react";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";
import Header from "../layout/components/header/header";
import { homeBoxStyles, contentStyles } from "./styles/home.styles";
import { Dashboard } from "../layout/components/dashboard/dashboard";

const HomePage = () => {
  return (
    <Box sx={homeBoxStyles}>
      <Header />
      <Box sx={contentStyles}>
        <Sidebar />
        <Dashboard />
      </Box>
    </Box>
  );
};

export default HomePage;


