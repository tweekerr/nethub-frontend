import 'moment/locale/uk';
import 'moment/locale/en-gb';

import {createTheme, ThemeProvider} from '@mui/material';
import {useAppSelector} from './store';
import React, {Suspense, useEffect, useMemo} from 'react';
import {darkTheme, lightTheme} from './constants/themes';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './App.module.css';
import './i18n'
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';

function App() {
  const {theme, language} = useAppSelector((state) => state.generalReducer);

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  useEffect(() => {
    switchLocal(language);
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
