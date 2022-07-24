import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
  },
  checkbox: {
    justifyContent: "flex-start",
  },
  container: {
    alignSelf: "center",
    minHeight: "90vh",
    paddingTop: "80px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  showPass: {
    justifyContent: "flex-end !important",
  },
  registerLink: {
    paddingTop: "20px",
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const { loginHandler, setOpenLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const location = useLocation();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN HANDLE SUBMIT: >>>> ")

    loginHandler(username, password).then(() => {
      console.log("LOGIN HANDLER: HOME PATH >>>>> ", location)
      history("/");
      setOpenLogin((prev) => false);
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
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
          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password*
            </InputLabel>
            <OutlinedInput
              label="Password"
              required
              fullWidth
              name="password"
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className={classes.showPass}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox className="checkbox" value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid className={classes.registerLink} container>
            <Grid item xs>
              <Link href="/register" color="secondary">
                Don't have an account? Click to register
              </Link>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}