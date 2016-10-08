// NPM
import React from 'react';
import { render } from 'react-dom';

// App
import style from './test.css';

import login from 'shared/login';

const { List, Login } = login.components;

render(
  <div>
    <Login />
    <List />
  </div>,
  document.getElementById('App')
);
