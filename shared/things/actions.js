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

// export const putThings = (data) => {
//
//   return {
//     type: t.PUT_THINGS,
//     payload: {
//       promise: axios
//         .put('/api/things/', data)
//     }
//   };
// };
