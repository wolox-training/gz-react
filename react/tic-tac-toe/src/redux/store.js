import { createStore, compose, applyMiddleware, combineReducers as CR } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { fetchMiddleware, wrapCombineReducers } from 'redux-recompose';

import games from './match/reducer';
import users from './users/reducer';

export const history = createBrowserHistory();

const combineReducers = wrapCombineReducers(CR);

const reducers = combineReducers({
  router: connectRouter(history),
  games,
  users,
  form: formReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(reducers, composeEnhancer(applyMiddleware(thunk, fetchMiddleware, routerMiddleware(history))));
