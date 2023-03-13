import {
  createTheme,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "@fontsource/poppins";

export default function NotFound() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Poppins",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack
        component={Paper}
        square
        minHeight={`100vh`}
        alignItems="center"
        justifyContent={`center`}
      >
        <Typography variant="h1">404 Not Found!</Typography>
      </Stack>
    </ThemeProvider>
  );
}
