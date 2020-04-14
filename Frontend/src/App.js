import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import Chat from './pages/chat';
import Group from './pages/group';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Montserrat"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Route path='/' exact component={Login} />
          <Route path='/group' exact component={Group} />
          <Route path='/chat' exact component={Chat} />
        </Router>
      </ThemeProvider>
    </div>
  );
}