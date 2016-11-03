// NPM dependencies
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App dependencies
import * as actions from 'shared/things/actions';
import * as selectors from 'shared/things/selectors';

// Component dependencies
import style from './thing-list.css';

const cx = classnames.bind(style);

class ThingList extends React.Component {

  render () {

    return (
      <div className={style.root}>
        <ul>
          { this.props.things.map(thing => {
            return <li key={thing._id}>{thing.name}</li>
          }) }
        </ul>
      </div>
    );
  }

  componentWillMount () {

    if (this.props.isFetchingAll || this.props.hasFetchedAll) return;

    this.props.fetchAll();
  }
}

const mapState = () => {
  return createStructuredSelector({
    things: selectors.getAll,
    isFetchingAll: selectors.getIsFetchingAll,
    hasFetchedAll: selectors.getHasFetchedAll
  });
};

const mapDispatch = dispatch => {

  return {
    fetchAll: () => {
      return dispatch(actions.fetchAll());
    }
  };
};

ThingList.propTypes = {
  things: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  isFetchingAll: PropTypes.bool.isRequired,
  hasFetchedAll: PropTypes.bool.isRequired,
  fetchAll: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(ThingList);
