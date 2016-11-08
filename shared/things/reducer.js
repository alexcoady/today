// NPM dependencies
import _clone from 'lodash/clone';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _without from 'lodash/without';
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
    case `${t.DELETE_THING}_FULFILLED`: {
      return _without(state, action.payload.data.data._id);
    }
  }

  return state;
};

const byId = (state = {}, action) => {

  switch (action.type) {
    case `${t.PUT_THING}_FULFILLED`:
    case `${t.POST_THING}_FULFILLED`:
    case `${t.FETCH_ALL}_FULFILLED`: {
      const newState = _clone(state);
      const things = [].concat(action.payload.data.data);
      _each(things, thing => {
        newState[thing._id] = thing;
      });
      return newState;
    }
    case `${t.DELETE_THING}_FULFILLED`: {
      const newState = _clone(state);
      delete newState[action.payload.data.data._id];
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
