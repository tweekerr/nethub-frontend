import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store/storeConfiguration";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
