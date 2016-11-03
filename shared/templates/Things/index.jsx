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
        <h1 className={style.title}>Manage your things</h1>
        <div className={style.thingList}>
          <things.components.ThingList />
        </div>
      </div>
    );
  }
}

export default Things;
