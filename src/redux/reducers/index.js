import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listReducer from './listReducer';

export default history => combineReducers({
  router: connectRouter(history),
  listReducer
});