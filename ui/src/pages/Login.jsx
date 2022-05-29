import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthUser";
import * as yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  //   const location = useLocation();

  //   const from = location.state?.from?.pathname || "/";

  // Alert state
  const [alertSettings, setAlertSettings] = useState({
    visible: false,
    message: "",
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email provided")
      .required("Email required."),
    password: yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      await onSubmit(email, password);
    },
  });

  const onSubmit = useCallback(
    async (email, password) => {
      const result = await auth.login(email, password);
      if (result.success) {
        navigate("/upload", { replace: true });
      } else {
        setAlertSettings({
          visible: true,
          message: result.message,
        });
      }
    },
    [auth, navigate]
  );

  const onAlertClose = () => {
    setAlertSettings({
      visible: false,
      message: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={alertSettings.visible}
          onClose={onAlertClose}
        >
          <Alert onClose={onAlertClose} variant="filled" severity="error">
            {alertSettings.message}
          </Alert>
        </Snackbar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
