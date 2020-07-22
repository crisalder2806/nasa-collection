import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export default createStore(
  createRootReducer(history),
  composerEnhancer(applyMiddleware(routerMiddleware(history), thunk))
);