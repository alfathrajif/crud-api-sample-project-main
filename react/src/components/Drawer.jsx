import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const themeAppBar = createTheme({
  palette: {
    primary: {
      main: "#212529", // ubah warna primary sesuai kebutuhan
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
});

export default function PersistentDrawerLeft(props) {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Get User Login when page starter
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  const { children } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledMenu = styled(Menu)({
    "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
      backgroundColor: "#1b2021",
      color: "#fff",
    },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <ThemeProvider theme={themeAppBar}>
        <AppBar position="fixed" open={open} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              sx={{ flexGrow: 1 }}
              component={RouterLink}
              direction={`row`}
              to="/users"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                CRUD
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: 400 }}>
                API
              </Typography>
            </Stack>
            <Stack
              direction={`row`}
              to="/users"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Stack direction={`row`} alignItems="center" spacing={2}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <StyledMenu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Stack
                  direction={`row`}
                  p={1.5}
                  px={3}
                  mb={1}
                  spacing={1.5}
                  alignItems={`center`}
                >
                  <Avatar
                    alt={user.name}
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: 45, height: 45 }}
                  />
                  <Stack>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 200 }}
                      color="grey"
                    >
                      {user.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ borderColor: "#30343f" }} />
                <Stack
                  direction={`row`}
                  justifyContent={`end`}
                  p={1}
                  px={3}
                  mt={1}
                  onClick={handleCloseUserMenu}
                >
                  <Button
                    variant="contained"
                    href="#"
                    onClick={onLogout}
                    className="btn-logout"
                    sx={{ backgroundColor: "#30343f" }}
                  >
                    Logout
                  </Button>
                </Stack>
              </StyledMenu>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#212529",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            sx={{ paddingBottom: 0 }}
            component={RouterLink}
            to="/dashboard"
          >
            <ListItemButton
              sx={{
                borderRadius: 1,
                padding: "12px 15px",
              }}
            >
              <ListItemIcon>
                <InboxIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <Typography color="white">Dashboard</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ paddingBottom: 0 }}
            component={RouterLink}
            to="/users"
          >
            <ListItemButton
              sx={{
                borderRadius: 1,
                padding: "12px 15px",
              }}
            >
              <ListItemIcon>
                <InboxIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <Typography color="white">Users</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="xl">{children}</Container>
      </Main>
    </Box>
  );
}
