import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
    maxWidth: "500px",
    alignItems: "center",
  },
  navUser: {
    display: "flex",
    "&:hover": {
      color: "#2b727b",
    }
  },
  loginLogout: {
    display: "flex",
  },
  logInner: {
    display: "flex",
    textDecoration: 'none',
    color: "#a9a9a9",
    "&:hover": {
      color: "#2b727b",
    }
  },
  navHome: {
    maxWidth: "340px",
  }

}));

export default function Nav(props) {
  const classes = useStyles();
  // const { user } = useContext(UserContext);
  const { logoutHandler, user } = props;

//console.log(user,'user');


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
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "#a9a9a9",
              textDecoration: 'none',
              justifyContent: "space-between",
            }}
          >
          <p className={classes.navHome}>
            IMDEX WEATHER
          </p>
          <div className={classes.login}>
            {user ? 
                  <>
                  <div className={classes.navUser}>
                    {/* <AccountCircleOutlinedIcon/> */}
                      Account
                  </div>
                  <div className={classes.loginLogout}>
                    <Link 
                      onClick={logoutHandler} 
                      to="/login" 
                      className={classes.logInner}
                      >
                      Logout
                    </Link>
                  </div>
                  </>

                : (
                <div className={classes.loginLogout}>
                  <Link className={classes.logInner} to="/login">
                    Login
                  </Link>
                </div>
            )}
          </div>
          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}