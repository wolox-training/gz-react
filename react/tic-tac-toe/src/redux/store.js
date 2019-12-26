import { createStore, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import matches from './match/reducer';

const reducers = combineReducers({
  matches,
  form: formReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(reducers, composeEnhancer());
