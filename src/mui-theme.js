import { createMuiTheme } from '@material-ui/core';

const overrides = {
  MuiButton: {
    root: {
      userSelect: 'none',
      outline: 'none',
      margin: '8px',
      boxShadow: 'none !important',
      borderRadius: 2,
    },
  },
  MuiInputBase: {
    input: {
      background: '#f7f7f7 !important',
      padding: '12px !important',
    },
    root: {
      margin: '0 0 10px 0',
    },
  },
};

const breakpoints = {
  keys: ['sm', 'md', 'lg', 'xl'],
  values: {
    sm: '540px',
    md: '769px',
    lg: '1024px',
    xl: '1220px',
  },
};

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    secondary: {
      main: '#F5A623',
      light: '#ECB354',
      dark: '#E49A1F',
      contrastText: '#fff',
    }, // Feel free to change this
    primary: {
      main: '#158EE1',
      light: '#4CA3DE',
      dark: '#057DCF',
      contrastText: '#fff',
    },
  },
  breakpoints,
  overrides,
  typography: {
    useNextVariants: true,
  },
});

export default theme;
