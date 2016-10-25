// NPM
import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App
import days from 'shared/days';

// Component
import style from './overview.css';

class Overview extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <h1 className={style.title}>Was today a good day?</h1>
          <div className={style.dayForm}>
            <days.components.DayForm days={this.props.days} />
          </div>
        </div>
      </div>
    );
  }

  componentWillMount () {

    const {
      isFetchingAllDays,
      hasFetchedAllDays,
      fetchAllDays
    } = this.props;

    if (!isFetchingAllDays && !hasFetchedAllDays) fetchAllDays();
  }
}

const mapState = () => createStructuredSelector({
  days: days.selectors.getAll,
  hasFetchedAllDays: days.selectors.getHasFetchedAll,
  isFetchingAllDays: days.selectors.getIsFetchingAll
});

const mapDispatch = dispatch => {
  return {
    fetchAllDays: () => {
      const token = cookie.load('token');
      dispatch(days.actions.fetchAll(token)).catch(e => e);
    }
  };
};

Overview.propTypes = {
  fetchAllDays: React.PropTypes.func.isRequired,
  days: React.PropTypes.array.isRequired,
  hasFetchedAllDays: React.PropTypes.bool.isRequired,
  isFetchingAllDays: React.PropTypes.bool.isRequired,
};

export default connect(mapState, mapDispatch)(Overview);
