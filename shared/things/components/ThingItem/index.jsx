// NPM dependencies
import React, { PropTypes } from 'react';

// Component dependencies
import style from './thing-item.css';

const ThingItem = () => (
  <div className={style.root}></div>
);

ThingItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ThingItem;
