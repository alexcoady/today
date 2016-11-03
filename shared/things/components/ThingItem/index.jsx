// NPM dependencies
import React, { PropTypes } from 'react';

// Component dependencies
import style from './thing-item.css';

const ThingItem = ({ thing: { name } }) => (
  <div className={style.root}>
    {name}
  </div>
);

ThingItem.propTypes = {
  thing: PropTypes.shape({
    _id: PropTypes.string.isRequred,
    name: PropTypes.string.isRequred
  }).isRequired
};

export default ThingItem;
