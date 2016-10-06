// NPM
import React from 'react';

// Component
import style from './style.css';

const Login = () => {

  return (
    <div className={style.root}>
      <div className={style.inner}>
        <div>
          <a href="/auth/facebook">Login with facebook</a>
          <a href="/auth/twitter">Login with twitter</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
