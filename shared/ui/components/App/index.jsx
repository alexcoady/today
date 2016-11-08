// NPM
import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import 'shared/style/reset.css';
import 'shared/style/global.css';

// App
import Header from './../Header';
import user from 'shared/user';

// Component
import style from './app.css';

class App extends React.Component {

  render () {

    const {
      account,
      children,
      isAuthenticated,
      logOut
    } = this.props;

    return (
      <div className={style.root}>
        <div className={style.header}>
          <Header
            isAuthenticated={isAuthenticated}
            account={account}
            logOut={logOut} />
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    );
  }

  componentWillMount () {

    axios.defaults.headers.common['x-access-token'] = cookie.load('token');

    if (this.props.isAuthenticated) return;

    this.props.fetchAccount();
  }
}

const mapState = () => {

  return createStructuredSelector({
    account: user.selectors.getAccount,
    isAuthenticated: user.selectors.getIsAuthenticated
  });
}

const mapDispatch = dispatch => {

  return {
    fetchAccount: () => {
      return dispatch(user.actions.fetchAccount());
    },
    logOut: () => {
      cookie.remove('token');
      return dispatch(user.actions.logOut());
    }
  };
};

App.propTypes = {
  account: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,
  fetchAccount: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
};

export default connect(mapState, mapDispatch)(App);
