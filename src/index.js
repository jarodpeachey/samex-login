/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
// import { persistor, store } from './Store';

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
