import { createReducer, completeReducer, completeState } from 'redux-recompose';

import { getWinner } from '../../app/screens/Game/utils';

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
    [actions.SET_BOARD]: (state, action) => {
      const { history, stepNumber, xIsNext } = state;
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = [...newHistory[newHistory.length - 1].squares];
      if (getWinner(squares) || squares[action.payload]) {
        return state;
      }
      squares[action.payload] = xIsNext ? 'X' : 'O';
      return { ...state, history: [...newHistory, { squares }], stepNumber: newHistory.length, xIsNext: !xIsNext };
    },
    [actions.JUMP_TO]: (state, action) => ({ ...state, stepNumber: action.payload, xIsNext: action.payload % 2 === 0 })
  }
};

export default createReducer(initialState, completeReducer(reducerDescription));
