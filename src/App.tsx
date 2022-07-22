import 'typeface-inter';
import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/de';
import { useNavigate } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

import { ILanguage } from 'types';
import { createTheme, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import React, { useEffect } from 'react';
import { darkTheme, lightTheme } from 'constants/themes';
import { checkAuth } from 'store/thunks/authThunk';
import { Loader } from 'design-core/loader';

const LANGUAGE: ILanguage = 'uk';

function App() {
  switchLocal(LANGUAGE);
  const { theme, isLogin, loading, error } = useAppSelector(
    (state) => state.generalReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const themeOptions = React.useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(checkAuth());
    if (!isLogin && !loading) navigate('/login');
    if (error) alert(error);
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeProvider theme={themeOptions}>
      <AppRouter />
    </ThemeProvider>
  );
}

const switchLocal = (language: ILanguage) => {
  switch (language) {
    case 'uk':
      moment.locale('uk');
      break;
    case 'de':
      moment.locale('de');
      break;
  }
};

export default App;
