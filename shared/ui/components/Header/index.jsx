// NPM
import React from 'react';

// Component
import style from './header.css';

class Header extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <div>Today</div>
          <a href="/auth/facebook">Login / register with Facebook</a>
        </div>
      </div>
    );
  }
}

export default Header;
