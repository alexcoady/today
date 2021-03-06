// NPM
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'

// App
import ui from 'shared/ui';
import user from 'shared/user';
import templates from 'shared/templates';

const UserAuthenticated = UserAuthWrapper({
  authSelector: user.selectors.getAccount,
  authenticatingSelector: user.selectors.getIsAuthenticating,
  redirectActions: routerActions.replace,
  wrapperDisplayName: 'UserAuthenticated',
  failureRedirectPath: '/',
  LoadingComponent: ui.components.Loader
});

export default (
  <Route path="/" name="app" component={ui.components.App}>
    <IndexRoute component={templates.Overview} />
    <Route path="account">
      <IndexRoute component={UserAuthenticated(templates.Account)}/>
      <Route path="settings" component={UserAuthenticated(templates.Account)} />
      <Route path="things" component={UserAuthenticated(templates.Things)} />
    </Route>
    <Route path="history" component={UserAuthenticated(templates.History)} />
    <Route path="logged-out" component={templates.LoggedOut} />
  </Route>
);
