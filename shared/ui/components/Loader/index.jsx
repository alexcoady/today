// NPM dependencies
import React from 'react';

// Component dependencies
import style from './loader.css';

const Loader = () => (
  <div className={style.root}>
    <div className={style.inner}>
      <span className={style.dot}></span>
      <span className={style.dot}></span>
      <span className={style.dot}></span>
    </div>
  </div>
);

export default Loader;
