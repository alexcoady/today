// NPM dependencies
import React from 'react';

// App dependencies
import things from 'shared/things';

// Component dependencies
import style from './things.css';

class Things extends React.Component {

  render () {

    return (
      <div className={style.root}>
        Things page
        <div className={style.thingsForm}>
          <things.components.ThingsForm />
        </div>
      </div>
    );
  }
}

export default Things;
