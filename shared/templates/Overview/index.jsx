// NPM
import React, { PropTypes as T } from 'react';
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
            <days.components.DayForm
              today={this.props.today} />
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
  today: days.selectors.getToday,
  days: days.selectors.getAll,
  hasFetchedAllDays: days.selectors.getHasFetchedAll,
  isFetchingAllDays: days.selectors.getIsFetchingAll
});

const mapDispatch = dispatch => {
  return {
    fetchAllDays: () => {
      dispatch(days.actions.fetchAll()).catch(e => e);
    }
  };
};

Overview.propTypes = {
  fetchAllDays: T.func.isRequired,
  today: T.object,
  days: T.array.isRequired,
  hasFetchedAllDays: T.bool.isRequired,
  isFetchingAllDays: T.bool.isRequired,
};

export default connect(mapState, mapDispatch)(Overview);
