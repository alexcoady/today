// NPM
import React from 'react';

// Component
import style from './signin.css';

class Signin extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <a href="/auth/facebook">Login / register with Facebook</a>
        </div>
      </div>
    );
  }
}


export default Signin;
