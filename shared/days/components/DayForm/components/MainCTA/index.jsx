// NPM dependencies
import React from 'react';
import classnames from 'classnames/bind';

// Component dependencies
import style from './main-cta.css';
const cx = classnames.bind(style);

const MainCTA = ({ isGood }) => (
  <div className={style.root}>
    <div className={style.inner}>
      <div className={cx('buttonYes', { isActive: isGood })}>
        <div className={style.buttonInner}>
          <span className={style.title}>Yes</span>
        </div>
      </div>
      <div className={cx('buttonNo', { isActive: !isGood })}>
        <div className={style.buttonInner}>
          <span className={style.title}>No</span>
        </div>
      </div>
    </div>
  </div>
);

MainCTA.propTypes = {
  isGood: React.PropTypes.bool
};

export default MainCTA;
