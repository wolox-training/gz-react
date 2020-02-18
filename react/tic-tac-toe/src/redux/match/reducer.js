import { createReducer, completeReducer, completeState } from 'redux-recompose';

import { actions } from './actions';

const stateDescription = {
  history: [{
    squares: Array(9).fill()
  }],
  stepNumber: 0,
  xIsNext: true,
  matches: []
};

const initialState = completeState(stateDescription, ['history', 'stepNumber', 'xIsNext']);

const reducerDescription = {
  primaryActions: [actions.GET_MATCHES],
  override: {
    [actions.SET_BOARD]: (state, action) => ({ ...state, history: action.payload }),
    [actions.SET_STEP_NUMBER]: (state, action) => ({ ...state, stepNumber: action.payload, xIsNext: action.payload % 2 === 0 })
  }
};

export default createReducer(initialState, completeReducer(reducerDescription));
