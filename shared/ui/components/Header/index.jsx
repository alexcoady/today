// NPM
import React from 'react';
import { Link } from 'react-router';

// Component
import style from './header.css';

class Header extends React.Component {

  renderAuthenticatedContent () {

    const { account, logOut } = this.props;

    return (
      <div>
        <Link to="/account">Hi, {account.name}!</Link>
        <Link to="/history">History</Link>
        <a onClick={logOut}>Log out</a>
      </div>
    );
  }

  renderUnauthenticatedContent () {

    return (
      <a href="/auth/facebook">Login / register with Facebook</a>
    );
  }

  render () {

    const { isAuthenticated } = this.props;

    const content = isAuthenticated
      ? this.renderAuthenticatedContent()
      : this.renderUnauthenticatedContent();

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <Link to="/">Today</Link>
          {content}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  account: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  logOut: React.PropTypes.func.isRequired
};

export default Header;
