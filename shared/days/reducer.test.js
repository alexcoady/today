/* eslint-env jest */

// NPM dependencies
import { createStore } from 'redux';

// App dependencies
import rootReducer from 'shared/reducer';
import reducer from './reducer';
import * as selectors from './selectors';

// Feature dependencies
import * as t from './actionTypes';
import * as c from './constants';

const NAME = c.NAME;

describe('setup', () => {

  it('should set initial values', () => {

    expect(reducer(undefined, {})).toEqual({
      all: [],
      byDate: {},
      isFetchingAll: false,
      hasFetchedAll: false
    });

  });

});

describe('API responses', () => {

  it('should map to correct date format yyyy-mm-dd', () => {

    const store = createStore(rootReducer);

    // months are 0-indexed
    const getResponse = [{
      date: new Date(2016, 10, 20)
    }, {
      date: new Date(2016, 10, 15, 15, 57, 45)
    }];

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: getResponse } }
    });

    expect(store.getState()[NAME].all[0]).toBe('2016-11-20');
    expect(store.getState()[NAME].all[1]).toBe('2016-11-15');

    expect(store.getState()[NAME].byDate['2016-11-20']).toBeDefined();
    expect(store.getState()[NAME].byDate['2016-11-15']).toBeDefined();

  });

})
