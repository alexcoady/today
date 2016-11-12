// NPM dependencies
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';
import dateformat from 'dateformat';
import { combineReducers } from 'redux';

// App dependencies
import { isFetching, hasFetched } from 'shared/reducerFactory';

// Feature dependencies
import * as t from './actionTypes';

const format = date => dateformat(date, 'yyyy-mm-dd');

const all = (state = [], { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:
      return _uniq(_map(payload.data.data, day => format(day.date)));
    case `${t.POST_DAY}_FULFILLED`:
      return _uniq([...state, format(payload.data.data.date)]);
  }

  return state;
};

const byDate = (state = {}, { type, payload }) => {

  switch (type) {
    case `${t.FETCH_ALL}_FULFILLED`:

      return _reduce(payload.data.data, (result, value) => {
        return {...result, [format(value.date)]: value};
      }, {});

    case `${t.POST_DAY}_FULFILLED`:
      return {...state, [format(payload.data.data.date)]: payload.data.data};
  }

  return state;
};

export default combineReducers({
  all,
  byDate,
  isFetchingAll: isFetching(t.FETCH_ALL),
  hasFetchedAll: hasFetched(t.FETCH_ALL)
});
