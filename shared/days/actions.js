// NPM dependencies
import axios from 'axios';

// Feature dependencies
import * as t from './actionTypes';

export const fetchAll = (token) => {

  return {
    type: t.FETCH_ALL,
    payload: {
      promise: axios
        .get('/api/days/', {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};

export const postDay = (data, token) => {

  return {
    type: t.POST_DAY,
    payload: {
      promise: axios
        .post('/api/days/', data, {
          headers: {
            'x-access-token': token
          }
        })
    }
  };
};
