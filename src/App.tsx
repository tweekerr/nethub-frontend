import 'moment/locale/uk';
import 'moment/locale/en-gb';
import React, {useEffect, useState} from 'react';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';
import './i18n'
import {SnackbarProvider} from 'notistack';
import {check} from "./App.functions";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import {useAppStore} from "./store/config";

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
  const isTest = process.env.REACT_APP_IS_DEVELOPMENT === 'true'

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider
        maxSnack={3} autoHideDuration={3000} preventDuplicate
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <AppRouter/>
      </SnackbarProvider>
      {
        isTest && <ReactQueryDevtools initialIsOpen={false}/>
      }
    </QueryClientProvider>
  );
}

export default App;
