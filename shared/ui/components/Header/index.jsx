// NPM
import React from 'react';
import { Link } from 'react-router';

// Component
import style from './header.css';

class Header extends React.Component {

  renderAuthenticatedContent () {

    const { account } = this.props;

    return (
      <Link to="/account">Hi, {account.name}!</Link>
    );
  }

  renderUnauthenticatedContent () {

    return (
      <a href="/auth/facebook">Login / register with Facebook</a>
    );
  }

  render () {

    const { isLoggedIn } = this.props;

    const content = isLoggedIn
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
  isLoggedIn: React.PropTypes.bool.isRequired
};

export default Header;
