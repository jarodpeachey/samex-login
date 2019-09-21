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

// Define theme for Material-UI compnents
const theme = createMuiTheme({
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
  overrides,
  typography: {
    useNextVariants: true,
  },
});

export default theme;
