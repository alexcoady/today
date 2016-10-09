// NPM
import axios from 'axios';

// Feature
import * as t from './actionTypes';

export const fetchAccount = (token) => {

  return {
    type: t.FETCH_ACCOUNT,
    payload: {
      promise: axios
        .get('/api/user/', {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};

export const putAccount = (data, token) => {

  return {
    type: t.PUT_ACCOUNT,
    payload: {
      promise: axios
        .put('/api/user/', data, {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};
