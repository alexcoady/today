// NPM
import React from 'react';

// App
import user from 'shared/user';

// Component
import style from './account.css';

class Account extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <h1 className={style.title}>
            Update your account
          </h1>
          <div className={style.accountForm}>
            <user.components.AccountForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
