// NPM
import _map from 'lodash/map';
import _find from 'lodash/find';
import dateformat from 'dateformat';
import { createSelector } from 'reselect';

// Feature
import * as constants from './constants';

const format = date => dateformat(date, 'yyyy-mm-dd');

export const getDatesArray = state => state[constants.NAME].all;
export const getByIdObject = state => state[constants.NAME].byId;
export const getIsFetchingAll = state => state[constants.NAME].isFetchingAll;
export const getHasFetchedAll = state => state[constants.NAME].hasFetchedAll;

export const getAll = createSelector(
  [getDatesArray, getByIdObject],
  (all, obj) => _map(all, _id => obj[_id])
);

export const getToday = createSelector(
  [getAll],
  (all) => {
    const today = format(Date.now());

    return _find(all, day => {
      return today === format(day.date);
    });
  }
);
