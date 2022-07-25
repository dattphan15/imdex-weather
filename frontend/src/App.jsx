import React, { useEffect, useState } from 'react'
import Main from "./components/Main";
import NotLoggedIn from "./components/NotLoggedIn";
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import jwt from "jwt-decode";
import { Cookies, useCookies } from "react-cookie"
import DataContext from "./contexts/DataContext";
import UserContext from "./contexts/UserContext";
import axios from 'axios'
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [cookies , setCookies] = useCookies(['user'])
 
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d1071bb1135354df20150f668ce62347`
  console.log(cookies.token,'tokendata')
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      let tokenData = cookies.token
      axios.get(`http://localhost:3001/weather?city=${location}`,{ headers:{ 'x-access-token': tokenData } }).then((response) => {
        setData(response.data.data)
        // 
      })
      // setLocation("")
    }
  }


  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3001/api/users/authenticate")
  //     .then((res) => setUser(res.data))
  //     .catch((res) => {
  //       console.log("there was an error authenticating");
  //     });
  // }, []);


  const loginHandler = (username, password) => {
    return axios
      .post("http://localhost:3001/api/users/login", { username: username, password: password })
      .then((res) => {
        let token = jwt(res.data);
        setCookies('token',res.data,{ path: "/" });
        setCookies('tokendata',token,{ path: "/" });
        //console.log("LOGIN HANDLER SET USER: >>>> ", res.data,token)
        setUser(token);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };


  const registerHandler = (username, password, city) => {
    return axios
      .post("http://localhost:3001/api/users/register", {
        username: username,
        password: password,
        city: city,
      })
      .then((res) => {
        setUser(res.data);
        return "ok";
      })
      .catch((err) => {
        return "bad";
      });
  };

  const logoutHandler = () => {
    console.log('logouthandler');
      cookies.remove('user');
      cookies.remove('tokendata');
      // history('/');
  };

  const {
    state,
  } = useApplicationData();

  let myHistory = createBrowserHistory();
  //console.log("APPLICATION STATE: >>>> ", state)

  return (
      <HistoryRouter location={myHistory.location} history={myHistory}>
        <div className="app">
          <UserContext.Provider
            value={{
              user,
              loginHandler,
              openLogin,
              setOpenLogin,
              registerHandler,
            }}
          >
            <NotLoggedIn handleLoginClose={handleLoginClose} />
            <DataContext.Provider value={{ state }}>
              <Main
                loginHandler={loginHandler}
                logoutHandler={logoutHandler}
                user={user}
                setUser={setUser}
                data={data}
                location={location}
                setLocation={setLocation}
                searchLocation={searchLocation}
              />
            </DataContext.Provider>
          </UserContext.Provider>
        </div>
      </HistoryRouter>
  );
}

export default App;
