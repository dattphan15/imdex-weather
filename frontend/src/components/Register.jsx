import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Imdex Weather
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "80px",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginLink: {
    paddingTop: "20px",
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const { registerHandler } = useContext(UserContext);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("REGISTER HANDLE SUBMIT: >>>> ")
    registerHandler(username, password, city).then((data) => {
      if (data === "ok") {
        //console.log("OK >>>> ")
        history("/");
      }
      setError("Email already exists");
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ minHeight: "85vh" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="city"
            autoFocus
            value={city}
            onInput={(e) => setCity(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid className={classes.loginLink} container>
            <Grid item xs>
              <Link href="/login" color="secondary">
                Back to login
              </Link>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}