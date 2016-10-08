// NPM
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// App
import ui from 'shared/ui';

const Overview = () => {

  return (
    <div>
      Overview
    </div>
  );
}

export default (
  <Route path="/" name="app" component={ui.components.App}>
    <IndexRoute component={Overview} />
  </Route>
);
