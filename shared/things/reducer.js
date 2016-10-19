// NPM dependencies
import _clone from 'lodash/clone';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import { combineReducers } from 'redux';

// App dependencies
import { isFetching, hasFetched } from './../reducerFactory';

// Feature dependencies
import * as t from './actionTypes';

const all = (state = [], action) => {

  switch (action.type) {
    case `${t.FETCH_ALL}_FULFILLED`: {
      return _map(action.payload.data.data, '_id');
    }
    case `${t.PUT_THINGS}_FULFILLED`: {
      return _uniq([].concat(state, _map(action.payload.data.data, '_id')));
    }
  }

  return state;
};

const byId = (state = {}, action) => {

  switch (action.type) {
    case `${t.PUT_THINGS}_FULFILLED`:
    case `${t.FETCH_ALL}_FULFILLED`: {
      const newState = _clone(state);
      _each(action.payload.data.data, thing => {
        newState[thing._id] = thing;
      });
      return newState;
    }
  }

  return state;
};

export default combineReducers({
  all,
  byId,
  isFetchingAll: isFetching(t.FETCH_ALL),
  hasFetchedAll: hasFetched(t.FETCH_ALL)
});
