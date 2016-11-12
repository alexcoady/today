/* eslint-env jest */

// NPM dependencies
// import dateformat from 'dateformat';
import { createStore } from 'redux';

// App dependencies
import reducer from 'shared/reducer';
import * as selectors from './selectors';

// Feature dependencies
import * as t from './actionTypes';

// const format = date => dateformat(date, 'yyyy-mm-dd');

describe('Selects days', () => {

  it('returns today', () => {

    const getResponse = [{
      date: Date.now()
    }];

    const store = createStore(reducer);

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: getResponse } }
    });

    const today = selectors.getToday(store.getState());

    expect(today).toBeDefined();

  });

  it('returns null when day is not in store', () => {

    const now = new Date();
    const yesterday = new Date().setDate(now.getDate() - 1);
    const tomorrow = new Date().setDate(now.getDate() + 1);

    const getResponse = [{
      date: yesterday
    }, {
      date: tomorrow
    }];

    const store = createStore(reducer);

    store.dispatch({
      type: `${t.FETCH_ALL}_FULFILLED`,
      payload: { data: { data: getResponse } }
    });

    const today = selectors.getToday(store.getState());

    expect(today).toBe(null);
  });

});