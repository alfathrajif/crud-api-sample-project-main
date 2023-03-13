import {
  Button,
  createTheme,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  Link,
  FormHelperText,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const { setUser, setToken } = useStateContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

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
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const formTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: "Poppins" },
  });

  return (
    <ThemeProvider theme={formTheme}>
      <Stack>
        <Typography
          variant={`h5`}
          component={`h2`}
          mb={3}
          textAlign={`center`}
          fontWeight={600}
        >
          Create Account for Free
        </Typography>
        <Form onSubmit={onSubmit}>
          <Stack spacing={2} mb={2}>
            <TextField
              error={errors && errors.name ? true : false}
              helperText={errors && errors.name ? errors.name[0] : ""}
              inputRef={nameRef}
              type="text"
              id="outlined-textarea"
              label="Full Name"
              placeholder="Type here..."
              multiline
              fullWidth
            />
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
            <FormControl
              error={errors && errors.password ? true : false}
              fullWidth
              variant="outlined"
              size="small"
            >
              <TextField
                inputRef={passwordConfirmationRef}
                error={errors && errors.password ? true : false}
                type="password"
                id="outlined-textarea"
                label="Password Confirmation"
                placeholder="Type here..."
                multiline
                fullWidth
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
              Sign Up
            </Button>
            <Typography
              className="message"
              variant="body2"
              textAlign={`center`}
            >
              Already Registered?{" "}
              <Link component={RouteLink} to="/login" underline="hover">
                Login now
              </Link>
            </Typography>
          </Stack>
        </Form>
      </Stack>
    </ThemeProvider>
  );
}
