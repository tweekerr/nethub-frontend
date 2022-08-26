import 'moment/locale/uk';
import 'moment/locale/en-gb';

import {createTheme, ThemeProvider} from '@mui/material';
import {useAppDispatch, useAppSelector} from './store';
import React, {useEffect, useMemo} from 'react';
import {darkTheme, lightTheme} from './constants/themes';
import {checkAuth} from './store/thunks/authThunk';
import {Loader} from './components/UI/loader/Loader';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './App.module.css';
import Layout from "./components/Layout/Layout";


function App() {
  const {theme, loading, error, language} = useAppSelector((state) => state.generalReducer);
  const dispatch = useAppDispatch();

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  useEffect(() => {
    switchLocal(language);
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken'))
      dispatch(checkAuth());
    if (error) alert(error);
  }, []);

  return (
    <ThemeProvider theme={themeOptions}>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
