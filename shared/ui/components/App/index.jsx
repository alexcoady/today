// NPM
import React from 'react';

// App
import Header from './../Header';

// Component
import style from './app.css';

const App = ({ children }) => {

  return (
    <div className={style.root}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.children}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
