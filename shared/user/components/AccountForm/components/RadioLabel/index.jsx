// NPM dependencies
import React from 'react';

// Component dependencies
import style from './radio-label.css';

const RadioLabel = ({ input, val }) => (
  <label className={style.root}>
    <input className={style.radio} {...input} type="radio" value={val} checked={+input.value === val ? 'checked': ''} />
    <span className={style.label}>{val}</span>
  </label>
);

RadioLabel.propTypes = {
  input: React.PropTypes.object.isRequired,
  val: React.PropTypes.number.isRequired
};

export default RadioLabel;
