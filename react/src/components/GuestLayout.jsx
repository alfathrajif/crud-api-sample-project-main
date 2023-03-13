import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@fontsource/poppins";
import {
  Box,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";

export default function GuestLayout() {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }

  const themeLayout = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={themeLayout}>
      <CssBaseline />
      <Stack
        component={Paper}
        square
        className="login-signup-form animated fadeInDown"
      >
        <Box component={Paper} elevation={24} p={4}>
          <Outlet />
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
