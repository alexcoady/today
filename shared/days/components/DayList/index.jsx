// NPM dependencies
import React from 'react';
import dateformat from 'dateformat';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App dependencies
import * as actions from './../../actions';
import * as selectors from './../../selectors';

class DayForm extends React.Component {

  render () {

    const {
      days
    } = this.props;

    return (
      <div>
        Day list
        {days.map((day, index) => (
          <li key={index}>{dateformat(day.date, 'dd mmm dS yyyy')} {day.isGood ? 'Good day' : ''}</li>
        ))}
      </div>
    );
  }

  componentWillMount () {

    this.props.fetchAll();
  }
}

const mapState = () => {
  return createStructuredSelector({
    days: selectors.getAll
  });
};

const mapDispatch = dispatch => {

  return {
    fetchAll: () => {
      return dispatch(actions.fetchAll());
    }
  };
}

DayForm.propTypes = {
  days: React.PropTypes.array.isRequired,
  fetchAll: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(DayForm);
