import { createReducer, completeReducer, completeState } from 'redux-recompose';

import { actions } from './actions';

const stateDescription = {
  token: localStorage.getItem('token')
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.LOGIN],
  override: {
    [actions.LOGOUT]: (state) => ({ ...state, token: null })
  }
};

export default createReducer(initialState, completeReducer(reducerDescription));
