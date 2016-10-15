// NPM dependencies
import React from 'react';

// App dependencies
import days from 'shared/days';

// Component dependencies
import style from './history.css';

class History extends React.Component {

  render () {

    return (
      <div className={style.root}>
        History page

        <div>
          <days.components.DayList />
        </div>
      </div>
    );
  }
}

export default History;
