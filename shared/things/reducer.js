// NPM dependencies
import _clone from 'lodash/clone';
import _each from 'lodash/each';
import _map from 'lodash/map';
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
    case `${t.POST_THING}_FULFILLED`: {
      return [].concat(state, action.payload.data.data._id);
    }
  }

  return state;
};

const byId = (state = {}, action) => {

  switch (action.type) {
    case `${t.POST_THING}_FULFILLED`:
    case `${t.FETCH_ALL}_FULFILLED`: {
      const newState = _clone(state);
      const things = [].concat(action.payload.data.data);
      _each(things, thing => {
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
