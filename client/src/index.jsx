// NPM
import React from 'react';
import { render } from 'react-dom';

// App
import style from './test.css';

import login from './../../shared/login';

const { Login } = login.components;

render(
  <Login />,
  document.getElementById('App')
);
