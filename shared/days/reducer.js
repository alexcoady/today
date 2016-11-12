// NPM dependencies
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';
import { combineReducers } from 'redux';

// App dependencies
import { isFetching, hasFetched } from 'shared/reducerFactory';

// Feature dependencies
import * as t from './actionTypes';

const all = (state = [], { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:
      return _map(payload.data.data, '_id');
    case `${t.POST_DAY}_FULFILLED`:
      return [...state, payload.data.data._id];
  }

  return state;
};

const byId = (state = {}, { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:
      return _reduce(payload.data.data, (result, value) => {
        return {...result, [value._id]: value};
      }, {});

    case `${t.POST_DAY}_FULFILLED`:
    case `${t.PUT_DAY}_FULFILLED`:
      return {...state, [payload.data.data._id]: payload.data.data};
  }

  return state;
};

export default combineReducers({
  all,
  byId,
  isFetchingAll: isFetching(t.FETCH_ALL),
  hasFetchedAll: hasFetched(t.FETCH_ALL)
});
