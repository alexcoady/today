/* eslint-env jest */

// NPM dependencies
import { createStore } from 'redux';

// App dependencies
import rootReducer from 'shared/reducer';
import reducer from './reducer';

// Feature dependencies
import * as t from './actionTypes';
import * as c from './constants';

const NAME = c.NAME;

describe('setup', () => {

  it('should set initial values', () => {

    expect(reducer(undefined, {})).toEqual({
      all: [],
      byId: {},
      isFetchingAll: false,
      hasFetchedAll: false
    });

  });

});

describe('API responses', () => {

  it('should update day after successful PUT request', () => {

    const store = createStore(rootReducer);

    // months are 0-indexed
    const getResponse = [{
      _id: 1,
      date: new Date(2016, 10, 1),
      isGood: true
    }, {
      _id: 2,
      date: new Date(2016, 10, 2),
      isGood: true
    }];

    const putResponse = {
      _id: 1,
      date: new Date(2016, 10, 1),
      isGood: false
    };

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: getResponse } }
    });

    expect(store.getState()[NAME].byId[1].isGood).toBe(true);
    expect(store.getState()[NAME].byId[2].isGood).toBe(true);

    store.dispatch({
      type: `${t.PUT_DAY}_FULFILLED`,
      payload: { data: { data: putResponse } }
    });

    expect(store.getState()[NAME].byId[1].isGood).toBe(false);
    expect(store.getState()[NAME].byId[2].isGood).toBe(true);

  });

})
