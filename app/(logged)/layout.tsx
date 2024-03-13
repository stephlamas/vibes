import React from "react";
import Header from "../layout/components/header/header";
import { Sidebar } from "../layout/components/sidebar/sidebar";
import { Box } from "@mui/material";

export default function Logged({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Sidebar />
                <Box
                    sx={{
                        flex: 1,
                        paddingTop: '26px',
                        marginLeft: '0',
                        '@media (min-width: 960px)': { 
                            marginLeft: '260px',
                        }
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}
