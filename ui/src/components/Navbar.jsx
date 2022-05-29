import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthUser";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClicked = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClosed = () => setAnchorEl(null);

  const handleNavUpload = () => {
    handleMenuClosed();
    navigate("/upload");
  };

  const handleNavDelete = () => {
    handleMenuClosed();
    navigate("/delete");
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {auth.isAuthenticated ? (
          <div>
            <IconButton
              id="menu-button"
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClicked}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClosed}
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
            >
              <MenuItem onClick={handleNavUpload}>Upload data</MenuItem>
              <MenuItem onClick={handleNavDelete}>Delete data</MenuItem>
            </Menu>
          </div>
        ) : (
          <></>
        )}
        <Typography variant="h6" className={classes.title}>
          <RouterLink className={classes.link} to="/">
            QR Code
          </RouterLink>
        </Typography>
        {auth.isAuthenticated ? (
          <Link color="white" underline="none" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <RouterLink className={classes.link} to="/login">
            Login
          </RouterLink>
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
