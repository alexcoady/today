// NPM
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App
import days from 'shared/days';
import things from 'shared/things';
import ui from 'shared/ui';

// Component
import style from './overview.css';

class Overview extends React.Component {

  isLoading () {

    const {
      isFetchingAllDays,
      isFetchingAllThings
    } = this.props;

    return isFetchingAllDays || isFetchingAllThings;
  }

  render () {

    if (this.isLoading()) return <ui.components.Loader />;

    return (
      <div className={style.root}>
        <div className={style.inner}>
          <h1 className={style.title}>Was today a good day?</h1>
          <div className={style.dayForm}>
            <days.components.DayForm
              today={this.props.today}
              things={this.props.things} />
          </div>
        </div>
      </div>
    );
  }

  componentWillMount () {

    const {
      isFetchingAllDays,
      hasFetchedAllDays,
      fetchAllDays,
      isFetchingAllThings,
      hasFetchedAllThings,
      fetchAllThings
    } = this.props;

    if (!isFetchingAllDays && !hasFetchedAllDays) fetchAllDays();
    if (!isFetchingAllThings && !hasFetchedAllThings) fetchAllThings();
  }
}

const mapState = () => createStructuredSelector({
  today: days.selectors.getToday,
  days: days.selectors.getAll,
  hasFetchedAllDays: days.selectors.getHasFetchedAll,
  isFetchingAllDays: days.selectors.getIsFetchingAll,
  things: things.selectors.getAll,
  hasFetchedAllThings: things.selectors.getHasFetchedAll,
  isFetchingAllThings: things.selectors.getIsFetchingAll
});

const mapDispatch = dispatch => {
  return {
    fetchAllDays: () => {
      dispatch(days.actions.fetchAll()).catch(e => e);
    },
    fetchAllThings: () => {
      dispatch(things.actions.fetchAll()).catch(e => e);
    }
  };
};

Overview.propTypes = {
  today: T.object,
  days: T.array.isRequired,
  fetchAllDays: T.func.isRequired,
  hasFetchedAllDays: T.bool.isRequired,
  isFetchingAllDays: T.bool.isRequired,
  things: T.array.isRequired,
  fetchAllThings: T.func.isRequired,
  hasFetchedAllThings: T.bool.isRequired,
  isFetchingAllThings: T.bool.isRequired
};

export default connect(mapState, mapDispatch)(Overview);
