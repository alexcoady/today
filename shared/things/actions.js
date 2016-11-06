// NPM dependencies
import axios from 'axios';

// Feature dependencies
import * as t from './actionTypes';

export const fetchAll = () => {

  return {
    type: t.FETCH_ALL,
    payload: {
      promise: axios.get('/api/things/')
    }
  };
};

export const postThing = thing => {

  return {
    type: t.POST_THING,
    payload: {
      promise: axios.post('/api/things/', thing)
    }
  };
};

export const putThing = thing => {

  return {
    type: t.PUT_THING,
    payload: {
      promise: axios.put(`/api/things/${thing._id}`, thing)
    }
  };
};

export const deleteThing = thing => {

  return {
    type: t.DELETE_THING,
    payload: {
      promise: axios.delete(`/api/things/${thing._id}`)
    }
  };
};
