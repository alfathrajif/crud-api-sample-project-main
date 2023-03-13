import { Outlet } from "react-router-dom";
import "@fontsource/poppins";
import Drawer from "./Drawer";
import { createTheme, ThemeProvider } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";
import NotificationDialog from "./NotificationDialog";

export default function DefaultLayout() {
  const { notification } = useStateContext();

  // Style
  const themeLayout = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#212529",
      },
      text: {
        primary: "#fff",
      },
    },
    typography: {
      fontFamily: "Poppins",
      fontSize: 14,
    },
  });

  return (
    <ThemeProvider theme={themeLayout}>
      <Drawer>
        <Outlet />
      </Drawer>
      {notification && <NotificationDialog>{notification}</NotificationDialog>}
    </ThemeProvider>
  );
}
