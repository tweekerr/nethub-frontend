import 'moment/locale/uk';
import 'moment/locale/en-gb';

import {createTheme, ThemeProvider} from '@mui/material';
import {useActions, useAppSelector} from './store/storeConfiguration';
import React, {useEffect, useMemo, useState} from 'react';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './App.module.css';
import './i18n'
import {SnackbarProvider} from 'notistack';
import {check} from "./App.functions";
import {darkTheme, lightTheme} from "./constants/themes";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

function App() {
  const {theme, language} = useAppSelector((state) => state.generalReducer);
  const {login} = useActions();

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );


  useEffect(() => {
    switchLocal(language);
    (async () => await check())().then((data) => {
      if (data)
        login({username: data.username, profilePhotoLink: data.image, firstName: data.firstname})
    })

  }, []);

  const [client] = useState<QueryClient>(new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      staleTime: 50000
      },
    }
  }));
  const isTest = process.env.REACT_APP_IS_DEVELOPMENT === 'true'

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider
        maxSnack={3} autoHideDuration={3000} preventDuplicate
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <ThemeProvider theme={themeOptions}>
          <AppRouter/>
        </ThemeProvider>
      </SnackbarProvider>
      {isTest && <ReactQueryDevtools initialIsOpen={false}/>}
    </QueryClientProvider>
  );
}

export default App;
