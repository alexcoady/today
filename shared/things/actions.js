// NPM dependencies
import axios from 'axios';

// Feature dependencies
import * as t from './actionTypes';

export const fetchAll = (token) => {

  return {
    type: t.FETCH_ALL,
    payload: {
      promise: axios
        .get('/api/things/', {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};

export const putThings = (data, token) => {

  return {
    type: t.PUT_THINGS,
    payload: {
      promise: axios
        .put('/api/things/', data, {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};
