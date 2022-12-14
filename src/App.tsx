import 'moment/locale/uk';
import 'moment/locale/en-gb';
import React, {useEffect, useState} from 'react';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
// import './i18n'
import {SnackbarProvider} from 'notistack';
import {check} from "./App.functions";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import {useAppStore} from "./store/config";
import {BrowserRouter} from "react-router-dom";
import theme from "./constants/themes";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
  const language = useAppStore(state => state.language);
  const login = useAppStore(state => state.login);


  useEffect(() => {
    switchLocal(language);
    (async () => await check())().then((data) => {
      if (data)
        login({username: data.username, profilePhotoLink: data.image, firstName: data.firstname, id: data.sid})
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
  const isTest = import.meta.env.VITE_IS_DEVELOPMENT === 'true'

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider
        maxSnack={5} autoHideDuration={3000} preventDuplicate
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
        </ChakraProvider>
      </SnackbarProvider>
      {
        isTest && <ReactQueryDevtools initialIsOpen={false}/>
      }
    </QueryClientProvider>
  );
}

export default App;
