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
        Account page
        <div className={style.accountForm}>
          <user.components.AccountForm />
        </div>
      </div>
    );
  }
}

export default Account;
