// NPM
import _map from 'lodash/map';
// import { createSelector } from 'reselect';

// Feature
import * as c from './constants';

export const getIsFetchingAll = s => s[c.NAME].isFetchingAll;
export const getHasFetchedAll = s => s[c.NAME].hasFetchedAll;

export const getAll = state => _map(state[c.NAME].all, id => {
  return state[c.NAME].byId[id];
})
