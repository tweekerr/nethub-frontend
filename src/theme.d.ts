declare module '@mui/material/styles' {
  export interface Theme {
    primary: {
      main: string,
    }
    header: {
      main: string,
      search: string
    }
  }

  interface ThemeOptions{
    primary: {
      main: React.CSSProperties['color'],
    }
    header: {
      main: React.CSSProperties['color'],
      search: React.CSSProperties['color'],
    }
  }
}
