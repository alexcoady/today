// NPM dependencies
import React from 'react';
import classnames from 'classnames/bind';

// Component dependencies
import style from './main-cta.css';
const cx = classnames.bind(style);

const MainCTA = ({ input: { onBlur, onChange, value }, meta: { touched } }) => (
  <div className={style.root}>
    <div className={style.inner}>
      <div onClick={() => { onChange(true); onBlur(true); }} className={cx('buttonYes', { isActive: value, isTouched: touched })}>
        <div className={style.buttonInner}>
          <span className={style.title}>Yes</span>
        </div>
      </div>
      <div onClick={() => { onChange(false); onBlur(false); }} className={cx('buttonNo', { isActive: !value, isTouched: touched })}>
        <div className={style.buttonInner}>
          <span className={style.title}>No</span>
        </div>
      </div>
    </div>
  </div>
);

MainCTA.propTypes = {
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired
};

export default MainCTA;
