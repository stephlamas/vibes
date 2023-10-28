import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { dashboardStyles } from "./styles/dashboard.styles";

export function Dashboard() {
    return (
        <Box sx={dashboardStyles}>
            <Typography variant="TITLE_S" component="h1">
                Upcoming shows for you
            </Typography>
        </Box>
    );
}
