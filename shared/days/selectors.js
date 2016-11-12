// NPM
import _map from 'lodash/map';
import dateformat from 'dateformat';
import { createSelector } from 'reselect';

// Feature
import * as constants from './constants';

export const getDatesArray = state => state[constants.NAME].all;
export const getByDateObject = state => state[constants.NAME].byDate;
export const getIsFetchingAll = state => state[constants.NAME].isFetchingAll;
export const getHasFetchedAll = state => state[constants.NAME].hasFetchedAll;

export const getAll = createSelector(
  [getDatesArray, getByDateObject],
  (all, obj) => _map(all, date => obj[date])
);

export const getToday = createSelector(
  [getByDateObject],
  (obj) => {
    const today = dateformat(Date.now(), 'yyyy-mm-dd');
    return obj[today] || null;
  }
);
