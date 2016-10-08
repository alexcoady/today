/*global window, document*/

// NPM
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router'
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

import reduxFreeze from 'redux-freeze';

// App
import './reset.css';
import './root.css';

import reducer from 'shared/reducer';
import routes from 'shared/routes';

const middleware = applyMiddleware(
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
