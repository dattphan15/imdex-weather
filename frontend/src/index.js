import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie"

import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme({
// add custom theme styles here
palette: {
  type: "light",
  primary: {
    main: "#2b727b",
  },
  secondary: {
    main: "#646264",
  },
  text: {
    primary: "#252b2d",
    secondary: "rgba(61,58,58,0.54)",
    light: "rgb(250, 244, 234)",
  },
  background: {
    default: "#ffffff",
    secondary: "rgb(249,246,235)",
  },
},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
      <App />
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
