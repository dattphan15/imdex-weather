import React, { useEffect, useState } from 'react'
import Nav from "./Nav";
import { useCookies } from "react-cookie"
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';


const Home = (props) => {

  const [cookies , setCookies] = useCookies(['user']);
  const [ user, setUser ] = useState(null)
  const history = useNavigate();

  useEffect(()=>{
    if(!cookies.token){
      history("/");
    }
    if (cookies.tokendata) {
      const tokenData = cookies.tokendata
      tokenData.cookies = cookies.token
      setUser(tokenData);
    }
  },[])
 
  const {
    location,
    setLocation,
    searchLocation,
    data,
    logoutHandler,
  } = props

  //console.log('dd',user);
  return (
    <>
    <Nav user={user} logoutHandler={logoutHandler} />
    <div className="home">

    { user ? 
      <>
      <div className="container">
        <div className="top">
          <div className="location">
          <div className="welcome">
            Where are we headed?
          </div>
          <div className="search">
            <input
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
          </div>
            {data.name ? <p className="results">Displaying weather for {data.name}</p> : null }
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null }
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null }
          </div>
        </div>

        {data.name !== undefined && 
          <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null }
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null }
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} KM/H</p> : null }
            <p>Wind Speed</p>
          </div>
        </div>
        }
      </div>
        </>
    :
    <>
    <div className="container login">
      <Button variant="contained" href="/login" color="primary">Please login</Button>
    </div>
    </>
    }

      </div>
    </>
  );
};

export default Home;