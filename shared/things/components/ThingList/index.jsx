// NPM dependencies
import React, { PropTypes as T } from 'react';

// Component dependencies
import style from './thing-list.css';
import ThingItem from './../ThingItem';

class ThingList extends React.Component {

  render () {

    const {
      handleDelete,
      handleUpdate
    } = this.props;

    return (
      <div className={style.root}>
        <ul>
          { this.props.things.map(thing => {
            return <ThingItem
              key={thing._id}
              form={`thing[${thing._id}]`}
              initialValues={thing}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate} />
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
  })).isRequired,
  handleDelete: T.func.isRequired,
  handleUpdate: T.func.isRequired
};

export default ThingList;
