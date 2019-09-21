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

const renderApp = () => {
  ReactDOM.render(
    <>
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <Route render={props => <Application {...props} />} />
      </Router>
    </>,
    document.getElementById('app'),
  );
};

renderApp();
