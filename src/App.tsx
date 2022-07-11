import 'typeface-inter';
import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/de';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { ILanguage } from 'types';
import { createTheme, ThemeProvider } from '@mui/material';
import { useAppSelector } from 'store';
import React from 'react';
import { darkTheme, lightTheme } from 'constants/themes';

const LANGUAGE: ILanguage = 'uk';

function App() {
  switchLocal(LANGUAGE);
  const { theme } = useAppSelector((state) => state.generalReducer);

  const themeOptions = React.useMemo(
    () => createTheme(theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  return (
    <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
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
