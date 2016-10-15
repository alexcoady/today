// NPM dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// App dependencies
import user from 'shared/user';
import days from 'shared/days';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  [user.constants.NAME]: user.reducer,
  [days.constants.NAME]: days.reducer
});
