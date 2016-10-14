// NPM
import React from 'react';

// App
import days from 'shared/days';

// Component
import style from './overview.css';

class Overview extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <div className={style.dayForm}>
          <days.components.DayForm />
        </div>
      </div>
    );
  }
}

export default Overview;
