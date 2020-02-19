import { getWinner } from '../../app/screens/Game/utils';

import { actions } from './actions';

const initialState = {
  history: [{
    squares: Array(9).fill()
  }],
  stepNumber: 0,
  xIsNext: true,
  matches: [],
  isLoading: false
};

function games(state = initialState, action) {
  switch (action.type) {
    case actions.SET_BOARD: {
      const { history, stepNumber, xIsNext } = state;
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = [...newHistory[newHistory.length - 1].squares];
      if (getWinner(squares) || squares[action.payload]) {
        return state;
      }
      squares[action.payload] = xIsNext ? 'X' : 'O';
      return { ...state, history: [...newHistory, { squares }], stepNumber: newHistory.length, xIsNext: !xIsNext };
    }
    case actions.JUMP_TO:
      return { ...state, stepNumber: action.payload, xIsNext: action.payload % 2 === 0 };
    case actions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actions.GET_MATCHES:
      return { ...state };
    case actions.GET_MATCHES_FAILURE:
      return { ...state, matches: [], isLoading: false };
    case actions.GET_MATCHES_SUCCESS:
      return { ...state, matches: action.payload.data, isLoading: false };
    default:
      return state;
  }
}

export default games;
