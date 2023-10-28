"use client";
import React from "react";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";
import  Header from "../layout/components/header/header";
import { homeBoxStyles } from "./styles/home.styles";

const HomePage = () => {
  return (
    <Box sx={homeBoxStyles}>
      <Header />
      <Sidebar />
    </Box>
  );
};

export default HomePage;
