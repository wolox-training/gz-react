import { createStore, compose } from 'redux';

import matches from './match/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
export default createStore(matches, composeEnhancers());
