/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Application from './Application';

// Create history object for React
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

console.log(process.env.PUBLIC_URL);
console.log(process.env.NODE_ENV);

const baseURL = process.env.NODE_ENV === 'development' ? '/' : '/samex-login/';

const renderApp = () => {
  ReactDOM.render(
    <>
      <Router history={history} basename={baseURL}>
        <Route render={props => <Application basename={baseURL} {...props} />} />
      </Router>
    </>,
    document.getElementById('app'),
  );
};

renderApp();
