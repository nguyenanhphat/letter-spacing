import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './modules/commons';
import * as serviceWorker from './serviceWorker';
import App from './App';
import 'toastr/toastr.scss';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: SECONDARY_COLOR
    },
    secondary: {
      main: PRIMARY_COLOR
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 14
  },
  overrides: {
    MuiDrawer: {
      paper: {
        width: '300px'
      }
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
