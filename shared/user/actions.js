// NPM
import axios from 'axios';

// Feature
import * as t from './actionTypes';

export const fetchAccount = () => {

  return {
    type: t.FETCH_ACCOUNT,
    payload: {
      promise: axios.get('/api/user/')
    }
  };
};

export const putAccount = data => {

  return {
    type: t.PUT_ACCOUNT,
    payload: {
      promise: axios.put('/api/user/', data)
    }
  };
};

export const logOut = () => {

  return {
    type: t.LOG_OUT
  };
};
