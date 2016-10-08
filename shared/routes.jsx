// NPM
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// App
import ui from 'shared/ui';
import templates from 'shared/templates';

export default (
  <Route path="/" name="app" component={ui.components.App}>
    <IndexRoute component={templates.Overview} />
    <Route path="/account" component={templates.Account} />
    <Route path="/history" component={templates.History} />
    <Route path="/logged-out" component={templates.LoggedOut} />
  </Route>
);
