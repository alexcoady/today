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
      byId: {}
    });
  });

});

describe('reducer API consumption', () => {

  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('should add items to all array using ID', () => {

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: {
        data: [{
          name: 'Thing name',
          _id: 'thing-id'
        }, {
          name: 'Another thing name',
          _id: 'another-id'
        }]
      }
    });

    expect(store.getState()[c.NAME].all).toEqual([
      'thing-id',
      'another-id'
    ]);
  });

  it('should map things by their IDs', () => {

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: {
        data: [{
          name: 'A',
          _id: 'a'
        }, {
          name: 'B',
          _id: 'b'
        }]
      }
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

});
