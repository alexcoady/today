/* eslint-env jest */

// NPM dependencies
import { createStore } from 'redux';

// App dependencies
import reducer from './../reducer';

// Feature dependencies
import thingsReducer from './reducer';
import * as t from './actionTypes';
import * as c from './constants';

const NAME = c.NAME;

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

    expect(store.getState()[NAME].all).toEqual([
      'thing-id',
      'another-id'
    ]);

    expect(store.getState()[NAME].byId).toEqual({
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

    expect(store.getState()[NAME].all.length).toBe(1);
    expect(store.getState()[NAME].byId).toEqual({
      'a': data[0]
    });

    store.dispatch({
      type: `${t.POST_THING}_FULFILLED`,
      payload: { data: { data: data[1] } }
    });

    expect(store.getState()[NAME].all.length).toBe(2);
    expect(store.getState()[NAME].byId).toEqual({
      'a': data[0],
      'b': data[1]
    });
  })

  it('should update a thing', () => {

    const fetchAllData = [{
      name: 'A',
      _id: 'a'
    }, {
      name: 'B',
      _id: 'b'
    }];

    const putData = {
      name: 'C',
      _id: 'b'
    };

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: fetchAllData } }
    });

    expect(store.getState()[NAME].all).toEqual(['a', 'b']);
    expect(store.getState()[NAME].byId['b'].name).toBe('B');

    store.dispatch({
      type: `${t.PUT_THING}_FULFILLED`,
      payload: { data: { data: putData } }
    });

    expect(store.getState()[NAME].all).toEqual(['a', 'b']);
    expect(store.getState()[NAME].byId['b'].name).toBe('C');
  });

  it('should delete a thing', () => {

    const fetchAllData = [{
      name: 'A',
      _id: 'a'
    }, {
      name: 'B',
      _id: 'b'
    }];

    const deleteData = {
      _id: 'a'
    };

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: fetchAllData } }
    });

    expect(store.getState()[NAME].all.length).toBe(2)
    expect(store.getState()[NAME].byId['a']).toBeDefined();
    expect(store.getState()[NAME].byId['b']).toBeDefined();

    store.dispatch({
      type: `${t.DELETE_THING}_FULFILLED`,
      payload: { data: { data: deleteData } }
    });

    expect(store.getState()[NAME].all.length).toBe(1);
    expect(store.getState()[NAME].byId['a']).toBeUndefined();
    expect(store.getState()[NAME].byId['b']).toBeDefined();
  });
});
