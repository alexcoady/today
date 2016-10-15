// NPM dependencies
import { combineReducers } from 'redux';

// Feature dependencies
import * as t from './actionTypes';

const all = (state = [], action) => {

  switch (action.type) {
    case `${t.FETCH_ALL}_FULFILLED`:
      return action.payload.data.data;
    case `${t.POST_DAY}_FULFILLED`:
      return [...state, action.payload.data.data];
  }

  return state;
};

export default combineReducers({
  all
});
