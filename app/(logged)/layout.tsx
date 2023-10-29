import React from "react";
import Header from "../layout/components/header/header";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";

export default function Logged({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <Sidebar />
                <Box style={{ flex: 1, paddingTop: '26px' }}>
                    {children}
                </Box>
            </Box>
        </>
    );
}
