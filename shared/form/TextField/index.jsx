// NPM
import React, { PropTypes as T } from 'react';
import classnames from 'classnames/bind';

// Component
import style from './text-field.css';

const cx = classnames.bind(style);

const TextField = ({ input, label, type, meta: { error, warning } }) => (
  <div className={cx('field', { isError: error, isWarning: warning })}>
    <label className={style.label} htmlFor={input.name}>{label}</label>
    {error && <span className={style.error}>{error}</span>}
    <input id={input.name} {...input} type={type} className={cx('text')} />
  </div>
);

TextField.propTypes = {
  input: T.object.isRequired,
  label: T.string.isRequired,
  type: T.string.isRequired,
  meta: T.object.isRequired
};

export default TextField;
