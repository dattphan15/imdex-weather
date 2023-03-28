import React, { useState } from 'react'
import Main from "./components/Main";
import NotLoggedIn from "./components/NotLoggedIn";
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import jwt from "jwt-decode";
import { useCookies } from "react-cookie"
import DataContext from "./contexts/DataContext";
import UserContext from "./contexts/UserContext";
import axios from 'axios'
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [cookie, setCookie] = useCookies(['user'])
 
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  // console.log(cookie.token,'tokendata')
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      let tokenData = user
      if (user) {
        tokenData = user.cookies
      }
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
      .then((res, req) => {
        let token = ''
        if (res.data.cookies) {
          token = jwt(res.data.cookies);
        } else {
          token = jwt(res.data);
        }
        // token.cookies = res.data
        setCookie('token',res.data,{ path: "/" });
        setCookie('tokendata',token,{ path: "/" });
        setUser(token);
        return token;
      })
      .catch((err) => {
        console.error(err.message);
      });
  };


  const logoutHandler = () => {
    return axios
    .post("http://localhost:3001/api/users/logout")
    .then((res, req) => {
      // cookie.remove('user');
      // cookie.remove('tokendata');
      setCookie('token', '', { path: "/" });
      setCookie('tokendata', '', { path: "/" });
      setUser(null);
    })
    .catch((err) => {
      console.error(err.message);
    });
  }


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
              logoutHandler,
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
