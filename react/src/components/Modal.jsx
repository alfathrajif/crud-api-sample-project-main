import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Paper,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Skeleton,
  CircularProgress,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const styleModalBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1b2021",
  color: "#fff",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent(props) {
  // Set User Data to Null
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { setNotification } = useStateContext(); // Notification useContext
  const { open, onClose, getUsers, selectedUserId } = props; // This Props from Users.jsx
  const [loading, setLoading] = useState(false); // Making loading state
  const [errors, setErrors] = useState(null); // Display Validate

  // Textfield Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      // get Data to edit form
      // If success execute, data in state will be null again
      axiosClient
        .get(`/users/${selectedUserId}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        })
        .finally(
          setUser({
            id: null,
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          })
        );
    }
  }, [selectedUserId]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    // Update session
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          onClose();
          getUsers();
          setNotification("User was successfully updated!");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      // Create session
      axiosClient
        .post(`/users`, user)
        .then(() => {
          onClose();
          getUsers();
          setNotification("User was successfully Create");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleClose = () => {
    setUser({
      id: null,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setLoading(true);
    onClose();
    setErrors(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Poppins",
      fontSize: 14,
    },
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styleModalBox} component={Paper}>
          {loading && (
            <Stack
              sx={{ display: "flex", minHeight: 370 }}
              alignItems="center"
              justifyContent={`center`}
            >
              <CircularProgress color="inherit" />
            </Stack>
          )}
          {!loading && (
            <Stack sx={{ minHeight: 370 }}>
              <Typography
                variant={`h5`}
                component={`h3`}
                mb={2}
                align={`center`}
              >
                {user.id == null ? `Create New User` : `Edit User`}
              </Typography>
              <Form onSubmit={onSubmit}>
                <ThemeProvider theme={darkTheme}>
                  <Stack spacing={2} mb={2}>
                    <TextField
                      error={errors && errors.name ? true : false}
                      helperText={errors && errors.name ? errors.name[0] : ""}
                      onChange={(ev) =>
                        setUser({ ...user, name: ev.target.value })
                      }
                      value={user.name}
                      type="text"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Type here..."
                      multiline
                      size="small"
                      fullWidth
                    />
                    <TextField
                      error={errors && errors.email ? true : false}
                      helperText={errors && errors.email ? errors.email[0] : ""}
                      onChange={(ev) =>
                        setUser({ ...user, email: ev.target.value })
                      }
                      value={user.email}
                      type="email"
                      id="outlined-textarea"
                      label="Email Address"
                      placeholder="Type here..."
                      multiline
                      size="small"
                      fullWidth
                    />
                    <FormControl
                      error={errors && errors.password ? true : false}
                      fullWidth
                      variant="outlined"
                      size="small"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        onChange={(ev) =>
                          setUser({ ...user, password: ev.target.value })
                        }
                        placeholder="Type here..."
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errors && errors.password && (
                        <FormHelperText>{errors.password[0]}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={errors && errors.password ? true : false}
                      fullWidth
                      variant="outlined"
                      size="small"
                    >
                      <TextField
                        onChange={(ev) =>
                          setUser({
                            ...user,
                            password_confirmation: ev.target.value,
                          })
                        }
                        error={errors && errors.password ? true : false}
                        type="password"
                        id="outlined-textarea"
                        label="Password Confirmation"
                        placeholder="Type here..."
                        multiline
                        size="small"
                        fullWidth
                      />
                      {errors && errors.password && (
                        <FormHelperText>{errors.password[0]}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                </ThemeProvider>
                <Stack direction={`column`} spacing={2} justifyContent={`end`}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleClose}
                    fullWidth
                  >
                    Close
                  </Button>
                </Stack>
              </Form>
            </Stack>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
