import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './index.scss'
import {ColorModeScript} from "@chakra-ui/react";
import theme from "./constants/themes";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <App/>
  </BrowserRouter>
);
