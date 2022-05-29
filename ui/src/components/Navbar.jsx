import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Menu from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthUser";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to="/">
            QR Code
          </Link>
        </Typography>
        {auth.isAuthenticated ? (
          <Button variant="text" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link className={classes.link} to="/login">
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

export default Navbar;
