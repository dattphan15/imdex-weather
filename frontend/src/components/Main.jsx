import { Route, Routes, Switch } from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
// import Account from "./Account";
import Register from "./Register";
import Grid from '@mui/material/Grid';

const Main = (props) => {

  //console.log("MAIN PROPS: >>>> ", props)

  const {
    user,
    setUser,
    data,
    location,
    setLocation,
    searchLocation,
    loginHandler,
    logoutHandler,
  } = props;

  //console.log("MAIN PROPS 2: >>>> ", props)

  return (
    <Grid
      container
      direction="column"
      style={{ position: "relative", width: "100%" }}
    >
      {/* <Grid item>
        <Nav logoutHandler={logoutHandler} user={user} />
      </Grid> */}
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/login" element={<Login logoutHandler={logoutHandler} user={user}/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/home" element={<Home data={data} setLocation={setLocation} searchLocation={searchLocation} logoutHandler={logoutHandler} />} />
        
      </Routes>
     
    </Grid>
  );
};

export default Main;