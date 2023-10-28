import { Box } from "@mui/material";
import { dashboardStyles } from "./styles/dashboard.styles";
import { EventDiscovery } from "./event-discovery/event-discovery";

export function Dashboard() {
    return (
        <Box sx={dashboardStyles}>
            <EventDiscovery />
        </Box>
    );
}
