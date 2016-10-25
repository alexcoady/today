// NPM dependencies
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';
import { combineReducers } from 'redux';

// Feature dependencies
import * as t from './actionTypes';

const all = (state = [], { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:
      return _uniq(_map(payload.data.data, 'date'));
    case `${t.POST_DAY}_FULFILLED`:
      return _uniq([...state, payload.data.data.date]);
  }

  return state;
};

const byDate = (state = {}, { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:

      return _reduce(payload.data.data, (result, value) => {
        return {...result, [value.date]: value};
      }, {});

    case `${t.POST_DAY}_FULFILLED`:
      return {...state, [payload.data.data.date]: payload.data.data};
  }

  return state;
};

export default combineReducers({
  all,
  byDate
});
