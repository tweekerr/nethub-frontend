import 'moment/locale/uk';
import 'moment/locale/en-gb';
import {useNavigate} from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material';
import {useAppDispatch, useAppSelector} from './store';
import React, {useEffect, useMemo} from 'react';
import {darkTheme, lightTheme} from './constants/themes';
import {checkAuth} from './store/thunks/authThunk';
import {Loader} from './components/UI/loader/Loader';
import {switchLocal} from "./utils/localization";
import AppRouter from './components/AppRouter';


function App() {
  const {theme, isLogin, loading, error, language} = useAppSelector((state) => state.generalReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const themeOptions = useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  useEffect(() => {
    switchLocal(language);
    if (!isLogin && !loading) navigate('/login');
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken'))
      dispatch(checkAuth());
    if (error) alert(error);
  }, [isLogin]);

  if (loading) return <Loader/>;

  return (
    <ThemeProvider theme={themeOptions}>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
