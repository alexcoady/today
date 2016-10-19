// NPM dependencies
import _clone from 'lodash/clone';
import _each from 'lodash/each';
import _map from 'lodash/map';
import { combineReducers } from 'redux';

// Feature dependencies
import * as t from './actionTypes';

const all = (state = [], action) => {

  switch (action.type) {
    case `${t.FETCH_ALL}_FULFILLED`: {
      return _map(action.payload.data, "_id");
    }
  }

  return state;
};

const byId = (state = {}, action) => {

  switch (action.type) {
    case `${t.FETCH_ALL}_FULFILLED`: {
      const newState = _clone(state);
      _each(action.payload.data, thing => {
        newState[thing._id] = thing;
      });
      return newState;
    }
  }

  return state;
};

export default combineReducers({
  all,
  byId
});
