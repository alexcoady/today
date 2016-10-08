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
