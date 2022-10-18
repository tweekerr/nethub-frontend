import 'moment/locale/uk';
import 'moment/locale/en-gb';

import {createTheme, ThemeProvider} from '@mui/material';
import {useActions, useAppSelector} from './store/storeConfiguration';
import React, {useEffect, useMemo} from 'react';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './App.module.css';
import './i18n'
import {SnackbarProvider} from 'notistack';
import {check} from "./App.functions";
import {darkTheme, lightTheme} from "./constants/themes";

function App() {
  const {theme, language} = useAppSelector((state) => state.generalReducer);
  const {login} = useActions();

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );


  useEffect(() => {
    console.log('environment', process.env.REACT_APP_IS_DEVELOPMENT);

    switchLocal(language);
    (async () => await check())().then((data) => {
      if (data) {
        console.log('data', data)
        login({username: data.username, profilePhotoLink: data.image})
      }
    })

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
