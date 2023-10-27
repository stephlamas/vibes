'use client';
import React, { useEffect, useState } from "react";
import SpotifyClient from "../layout/components/SpotifyClient";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";

const HomePage = () => {

  return <Box sx={{ display: 'flex' }}>
      <Sidebar />

    </Box>;
  
}

export default HomePage;
