// NPM dependencies
import axios from 'axios';

// Feature dependencies
import * as t from './actionTypes';

export const postDay = (data, token) => {

  console.log('posting')

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
