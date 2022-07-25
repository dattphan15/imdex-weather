import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginIcon from '@mui/icons-material/Login';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    padding: "0.5rem 0.5rem",
    maxWidth: "100%",
    zIndex: theme.zIndex.drawer + 1,
    alignItems: "center",
  },
  title: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-evenly"
    },
  },
  login: {
    display: "flex",
    justifyContent: "flex-end",
  },
  loginInner: {
    width: "100px",
  }

}));

export default function Nav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  // const { user } = useContext(UserContext);

  const { logoutHandler, user } = props;

console.log(user,'user');
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && (
        <MenuItem onClick={()=>handleMenuClose}>
          <Link to="/account">My Account</Link>
        </MenuItem>
      )}
      {/* <MenuItem onClick={handleMenuClose}>
        {user ? (
          <Link onClick={logoutHandler}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </MenuItem> */}
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar
        elevation={2}
        position="fixed"
        className={classes.appBar}
        style={{ background: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "#a9a9a9",
              textDecoration: 'none',
            }}
          >
            IMDEX WEATHER
          </Typography>

          <div className={classes.login}>
            {user ?  <Typography className={classes.title} variant="body2" noWrap>
                  <p style={{color:"#a9a9a9", width:"0%" }} > { user?.username } </p>
                </Typography> : (
              <Link className={classes.loginInner} to="/login">
                <Typography className={classes.title} variant="body2" noWrap>
                  LOGIN
                  <LoginIcon/>
                </Typography>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}