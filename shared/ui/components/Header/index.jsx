// NPM dependencies
import React from 'react';
import { Link } from 'react-router';

// Component dependencies
import style from './header.css';

class Header extends React.Component {

  renderAuthenticatedContent () {

    const { account } = this.props;

    return (
      <div>
        <Link className={style.link} to="/account/settings">{account.name}</Link>
      </div>
    );
  }

  renderOptions () {

    return (
      <div>
        <Link to="/history">History</Link>
        <Link to="/account/things">Things</Link>
        <a onClick={this.props.logOut}>Log out</a>
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
          <Link className={style.logo} to="/">Today</Link>
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
