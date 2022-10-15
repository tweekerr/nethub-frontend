import {ThemeOptions} from '@mui/material';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#414141',
      contrastText: '#896DC8',
    },
    secondary: {
      main: '#757575',
      contrastText: '#838383',
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#323232',
    },
    primary: {
      main: '#f8f8ff',
      contrastText: '#896DC8',
    },
    secondary: {
      main: '#757575',
      contrastText: '#838383',
    },
  },
};

export const lightThemeTest = {
  palette: {
    mode: 'light',
    primary: {
      main: '#FFFFFF',
      text: '#242D35'
    },
    secondary: {
      main: '#414141',
      text: '#414141'
    },
    third: {
      text: ''
    },
    menu: {
      text: '#414141',
      textOnHover: '#FFFFFF'
    },
    header: {
      main: '#FFFFFF',
      search: '#FFFFFF'
    }
  }
}
