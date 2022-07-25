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
