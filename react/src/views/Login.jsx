import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Link as RouteLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Form } from "react-bootstrap";
import {
  Box,
  createTheme,
  CssBaseline,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  Link,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { setUser, setToken } = useStateContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  // Validate
  const [errors, setErrors] = useState(null);

  // Textfield Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  const formTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: "Poppins" },
  });

  return (
    <ThemeProvider theme={formTheme}>
      <Stack component={Stack}>
        <Typography
          variant={`h5`}
          component={`h2`}
          mb={3}
          textAlign={`center`}
          fontWeight={600}
        >
          Login into your account
        </Typography>
        <Form onSubmit={onSubmit}>
          <Stack spacing={2} mb={2}>
            <TextField
              inputRef={emailRef}
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email ? errors.email[0] : ""}
              type="email"
              id="outlined-textarea"
              label="Email Address"
              placeholder="Type here..."
              multiline
              fullWidth
            />
            <FormControl
              error={errors && errors.password ? true : false}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                inputRef={passwordRef}
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors && errors.password && (
                <FormHelperText>{errors.password[0]}</FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              fullWidth
            >
              Login
            </Button>
            <Typography
              className="message"
              variant="body2"
              textAlign={`center`}
            >
              Not Registered?{" "}
              <Link component={RouteLink} to="/signup" underline="hover">
                Create an account
              </Link>
            </Typography>
          </Stack>
        </Form>
      </Stack>
    </ThemeProvider>
  );
}
