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

    expect(store.getState()[c.NAME].byId).toEqual({
      'thing-id': data[0],
      'another-id': data[1]
    });
  });

  it('should add new thing', () => {

    const data = [{
      name: 'A',
      _id: 'a'
    }, {
      name: 'B',
      _id: 'b'
    }];

    store.dispatch({
      type: `${t.POST_THING}_FULFILLED`,
      payload: { data: { data: data[0] } }
    });

    expect(store.getState()[c.NAME].all.length).toBe(1);
    expect(store.getState()[c.NAME].byId).toEqual({
      'a': data[0]
    });

    store.dispatch({
      type: `${t.POST_THING}_FULFILLED`,
      payload: { data: { data: data[1] } }
    });

    expect(store.getState()[c.NAME].all.length).toBe(2);
    expect(store.getState()[c.NAME].byId).toEqual({
      'a': data[0],
      'b': data[1]
    });

  })
});
