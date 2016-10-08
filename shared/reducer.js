// NPM
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// App
import user from 'shared/user';

export default combineReducers({
  routing: routerReducer,
  [user.constants.NAME]: user.reducer
});
