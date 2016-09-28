// NPM
import React from 'react';
import { render } from 'react-dom';

// App
import style from './test.css';

const Test = ({ children }) => {

  return (
    <div className="whatever">
      { children }
    </div>
  );
};

render(
  <Test>
    Test component
  </Test>,
  document.getElementById('App')
);
