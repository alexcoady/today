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

const isAuthenticated = (state = false, { type, payload }) => {

  if (type === `${t.FETCH_ACCOUNT}_FULFILLED`) {
    return typeof payload.data._id !== undefined;
  }

  return state;
};

export default combineReducers({
  account,
  isAuthenticating,
  isAuthenticated
});
