"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";
import  Header from "../layout/components/header/header";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />
    </Box>
  );
};

export default HomePage;
