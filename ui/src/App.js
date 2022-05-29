import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./components/AuthUser";
import Upload from "./pages/Upload";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route index path="/" element={<h1>Home</h1>} />
            <Route
              path="/upload"
              element={
                <RequireAuth>
                  <Upload />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
