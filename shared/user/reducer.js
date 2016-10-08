// NPM
import { combineReducers } from 'redux';

// Feature
import * as t from './actionTypes';

const account = (state = {}, action) => {

  switch (action.type) {
    case `${t.FETCH_ACCOUNT}_FULFILLED`:
      return action.payload.data;
  }

  return state;
};

export default combineReducers({
  account
});
