import 'moment/locale/uk';
import 'moment/locale/en-gb';

import {createTheme, ThemeProvider} from '@mui/material';
import {useAppSelector} from './store';
import React, {useEffect, useMemo} from 'react';
import {darkTheme, lightTheme} from './constants/themes';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './App.module.css';
import './i18n'
import {SnackbarProvider} from 'notistack';
import jwtDecode from "jwt-decode";
import {getAccessToken, getAccessTokenExpires} from "./utils/localStorageProvider";
import IJwtPayload from "./types/IJwtPayload";
import {useActions} from "./utils";

function App() {
  const {theme, language} = useAppSelector((state) => state.generalReducer);
  const {login} = useActions();

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  function isAuthorized() {
    return getAccessToken() && new Date(getAccessTokenExpires()!) > new Date();
  }

  useEffect(() => {
    switchLocal(language);
    if (isAuthorized()) {
      const data = jwtDecode<IJwtPayload>(getAccessToken()!);
      login({username: data.username, profilePhotoLink: data.image})
    }
  }, []);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} preventDuplicate
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <ThemeProvider theme={themeOptions}>
        <AppRouter/>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
