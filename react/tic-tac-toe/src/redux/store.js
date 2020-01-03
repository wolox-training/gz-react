import { createStore, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import games from './match/reducer';

const reducers = combineReducers({
  games,
  form: formReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(reducers, composeEnhancer());
