// NPM
import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App
import Header from './../Header';
import user from 'shared/user';

// Component
import style from './app.css';

class App extends React.Component {

  render () {

    const { children } = this.props;

    return (
      <div className={style.root}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.children}>
          {children}
        </div>
      </div>
    );
  }

  componentWillMount () {

    const { account } = this.props;

    console.log(`App will mount`, account);

    this.props.fetchAccount();
  }
}

const mapState = () => {

  return createStructuredSelector({
    account: user.selectors.getAccount
  });
}

const mapDispatch = dispatch => {

  return {
    fetchAccount: () => {
      const token = cookie.load('token');
      return dispatch(user.actions.fetchAccount(token));
    }
  };
};

App.propTypes = {
  children: React.PropTypes.object,
  fetchAccount: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(App);
