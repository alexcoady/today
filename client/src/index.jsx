import React from 'react';
import { render } from 'react-dom';

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
