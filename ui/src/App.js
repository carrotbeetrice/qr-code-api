import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/users" element={<Users />} /> */}
            </Routes>
          </header>
        </div>
      </Router>
    </ThemeProvider>
  );
}

// function Users() {
//   return <h2>Users</h2>;
// }

export default App;
