// NPM
// import { createSelector } from 'reselect';

// Feature
import * as constants from './constants';

export const getAccount = state => {
  return state[constants.NAME].account;
};

export const getIsAuthenticating = state => {
  return state[constants.NAME].isAuthenticating;
};

export const getIsAuthenticated = state => {
  return state[constants.NAME].isAuthenticated;
};

// export const getIsAuthenticated = createSelector(
//   [getAccount],
//   (account) => {
//     return typeof account._id !== 'undefined';
//   }
// );
