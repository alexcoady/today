// NPM
// import { createSelector } from 'reselect';

// Feature
import * as constants from './constants';

export const getAll = state => {
  return state[constants.NAME].all;
};
