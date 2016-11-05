// NPM dependencies
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// App dependencies
import things from 'shared/things';

// Component dependencies
import style from './things.css';

class Things extends React.Component {

  render () {

    const {
      postThing
    } = this.props;

    return (
      <div className={style.root}>
        <h1 className={style.title}>Manage your things</h1>
        <div className={style.thingList}>
          <things.components.ThingList things={this.props.things} />
          <things.components.ThingAddForm postThing={postThing} />
        </div>
      </div>
    );
  }

  componentWillMount () {

    if (this.props.isFetchingAll || this.props.hasFetchedAll) return;

    this.props.fetchAll();
  }
}

Things.propTypes = {
  things: T.array.isRequired,
  fetchAll: T.func.isRequired,
  isFetchingAll: T.bool.isRequired,
  hasFetchedAll: T.bool.isRequired,
  postThing: T.func.isRequired,
};

const mapState = () => createStructuredSelector({
  things: things.selectors.getAll,
  isFetchingAll: things.selectors.getIsFetchingAll,
  hasFetchedAll: things.selectors.getHasFetchedAll
});

const mapDispatch = dispatch => ({
  fetchAll: () => {
    return dispatch(things.actions.fetchAll()).catch(e => e);
  },
  postThing: thing => {
    return dispatch(things.actions.postThing(thing)).catch(e => e);
  }
});

export default connect(mapState, mapDispatch)(Things);
