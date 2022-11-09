import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store/storeConfiguration";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './index.scss'
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "./constants/themes";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <ChakraProvider
        theme={theme}
      >
        <App/>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
