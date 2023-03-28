import React, { useContext, useState } from "react";
// import UserContext from "../contexts/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
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
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-between"
    },
  },
  login: {
    display: "flex",
    justifyContent: "flex-end",
  },
  loginInner: {
    width: "100px",
    display: "flex",
    alignItems: "center",
  },
  logout: {
    fontSize: "1rem",
    color: "#a9a9a9",
    width: "0%"
  }

}));

export default function Nav(props) {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const isMenuOpen = Boolean(anchorEl);
  // const { user } = useContext(UserContext);
  const { logoutHandler, user } = props;
  // const [user, setUser] = useState(null);
  const history = useNavigate();

  const logout = () => {
    // setUser(null);
    logoutHandler();
    history("/");
  };

//console.log(user,'user');
  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     {user && (
  //       <MenuItem onClick={()=>handleMenuClose}>
  //         <Link to="/account">My Account</Link>
  //       </MenuItem>
  //     )}
  //     <MenuItem onClick={handleMenuClose}>
  //       {user ? (
  //         <Link onClick={logoutHandler}>Logout</Link>
  //       ) : (
  //         <Link to="/login">Login</Link>
  //       )}
  //     </MenuItem>
  //   </Menu>
  // );


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

          {/* <p style={{color:"#a9a9a9", width:"0%" }} > { user?.username } </p> */}

          <div className={classes.login}>
            {user ?  
                  (
                  <Typography className={classes.title}>
                    <span className={classes.logout}> { user?.username } </span>
                    <Link className={classes.loginInner} to="/login">
                        <span style={{display:"flex", justifyContent:"space-between"}}>
                          <span className={classes.logout} onClick={logout}> logout </span>
                          <LoginIcon style={{color:"#a9a9a9"}} />
                        </span>
                    </Link>
                  </Typography>
                  )
              : (
                <Link className={classes.loginInner} to="/login">
                  <Typography className={classes.title} variant="body2" noWrap>
                    login
                    <LoginIcon/>
                  </Typography>
                </Link>
                )
            }
          </div>

        </Toolbar>
      </AppBar>
      {/* {renderMenu} */}
    </div>
  );
}