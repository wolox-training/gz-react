import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import games from './match/reducer';
import users from './users/reducer';

const reducers = combineReducers({
  games,
  users,
  form: formReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
