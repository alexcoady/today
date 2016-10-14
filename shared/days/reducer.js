// NPM dependencies
import { combineReducers } from 'redux';

// Feature dependencies
import * as t from './actionTypes';

const days = (state = [], action) => {

  switch (action.type) {
    case `${t.POST_DAY}_FULFILLED`:
      return [...state, action.payload.data.data];
  }

  return state;
};

export default combineReducers({
  days
});
