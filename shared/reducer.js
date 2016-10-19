// NPM dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// App dependencies
import daysReducer from './days/reducer';
import * as daysConstants from './days/constants';

import thingsReducer from './things/reducer';
import * as thingsConstants from './things/constants';

import userReducer from './user/reducer';
import * as userConstants from './user/constants';


export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  [daysConstants.NAME]: daysReducer,
  [thingsConstants.NAME]: thingsReducer,
  [userConstants.NAME]: userReducer
});
