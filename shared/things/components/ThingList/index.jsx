// NPM dependencies
import React, { PropTypes as T } from 'react';

// Component dependencies
import style from './thing-list.css';
import ThingItem from './../ThingItem';

class ThingList extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <ul>
          { this.props.things.map(thing => {
            return <ThingItem key={thing._id} thing={thing} />
          }) }
        </ul>
      </div>
    );
  }
}

ThingList.propTypes = {
  things: T.arrayOf(T.shape({
    _id: T.string.isRequired,
    name: T.string.isRequired
  })).isRequired
};

export default ThingList;
