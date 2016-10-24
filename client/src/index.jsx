/*global window, document*/

// NPM
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router'
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

import reduxFreeze from 'redux-freeze';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from 'shared/reducer';
import routes from 'shared/routes';

const middleware = applyMiddleware(
  promiseMiddleware(),
  reduxFreeze
);
const enchancers = compose(
  middleware,
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
);

const store = createStore(
  reducer,
  enchancers
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('App')
);
