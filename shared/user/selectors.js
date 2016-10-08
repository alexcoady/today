// NPM
// import { createSelector } from 'reselect';

// Feature
import * as constants from './constants';

export const getAccount = state => {

  return state[constants.NAME].account;
};
