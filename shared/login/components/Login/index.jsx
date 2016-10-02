// NPM
import React from 'react';

// Component
import style from './style.css';

const Login = () => {

  return (
    <div className={style.root}>
      <div classname={style.inner}>
        <div>
          <a href="#">Login with facebook</a>
          <a href="#">Login with twitter</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
