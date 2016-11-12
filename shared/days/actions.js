// NPM dependencies
import axios from 'axios';

// Feature dependencies
import * as t from './actionTypes';

export const fetchAll = () => {

  return {
    type: t.FETCH_ALL,
    payload: {
      promise: axios.get('/api/days/')
    }
  };
};

export const postDay = data => {

  return {
    type: t.POST_DAY,
    payload: {
      promise: axios.post('/api/days/', data)
    }
  };
};

export const putDay = data => {

  return {
    type: t.PUT_DAY,
    payload: {
      promise: axios.put(`/api/days/${data._id}`, data)
    }
  };
};
