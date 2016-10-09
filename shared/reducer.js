// NPM
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// App
import user from 'shared/user';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  [user.constants.NAME]: user.reducer
});
