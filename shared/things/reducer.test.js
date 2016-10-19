/* eslint-env jest */

// NPM dependencies
import { createStore } from 'redux';

// App dependencies
import reducer from './../reducer';

// Feature dependencies
import thingsReducer from './reducer';
import * as t from './actionTypes';
import * as c from './constants';

describe('reducer setup', () => {

  it('should return initial value', () => {

    expect(thingsReducer(undefined, {})).toEqual({
      all: [],
      byId: {},
      isFetchingAll: false,
      hasFetchedAll: false
    });
  });

});

describe('reducer API consumption', () => {

  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('should add items to all array using ID', () => {

    const data = [{
      name: 'Thing name',
      _id: 'thing-id'
    }, {
      name: 'Another thing name',
      _id: 'another-id'
    }];

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data } }
    });

    expect(store.getState()[c.NAME].all).toEqual([
      'thing-id',
      'another-id'
    ]);
  });

  it('should map things by their IDs', () => {

    const data = [{
      name: 'A',
      _id: 'a'
    }, {
      name: 'B',
      _id: 'b'
    }];

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data } }
    });

    expect(store.getState()[c.NAME].byId).toEqual({
      'a': {
        name: 'A',
        _id: 'a'
      },
      'b': {
        name: 'B',
        _id: 'b'
      }
    });
  });

  it('should inject newly put things', () => {

    const data = [
      { _id: 'a', name: 'AAA' },
      { _id: 'b', name: 'BBB' },
      { _id: 'c', name: 'CCC' }
    ];

    store.dispatch({
      type: `${t.PUT_THINGS}_FULFILLED`,
      payload: { data: { data } }
    });

    expect(store.getState()[c.NAME].all).toEqual([ 'a', 'b', 'c' ]);

  });
});
