// NPM
import { combineReducers } from 'redux';

// Feature
import * as t from './actionTypes';

const account = (state = {}, action) => {

  switch (action.type) {
    case `${t.FETCH_ACCOUNT}_FULFILLED`:
    case `${t.PUT_ACCOUNT}_FULFILLED`:
      return action.payload.data;
    case `${t.LOG_OUT}`:
      return {};
  }

  return state;
};

const isAuthenticating = (state = false, action) => {

  switch (action.type) {
    case `${t.FETCH_ACCOUNT}_PENDING`:
      return true;
    case `${t.FETCH_ACCOUNT}_FULFILLED`:
    case `${t.FETCH_ACCOUNT}_REJECTED`:
      return false;
  }

  return state;
};

export default combineReducers({
  account,
  isAuthenticating
});
