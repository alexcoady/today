import React from 'react';
import { render } from 'react-dom';

console.log('hiya from index.jsx');

(() => {
  console.log('and what?');
})();

const Test = ({ children }) => {

  return (
    <div className="whatever">
      { children }
    </div>
  );
};

render(
  <Test>
    Just a silly test
  </Test>,
  document.getElementById('App')
);
