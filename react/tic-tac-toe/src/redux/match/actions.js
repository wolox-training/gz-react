import { completeTypes, createTypes } from 'redux-recompose';

import getMatches from '../../services/MatchesService';

export const actions = createTypes(
  completeTypes(['GET_MATCHES'], ['SET_BOARD', 'JUMP_TO', 'SET_STEP_NUMBER']),
  '@@MATCHES'
);

const actionsCreators = {
  getMatches: () => ({
    type: actions.GET_MATCHES,
    target: 'matches',
    service: getMatches
  }),
  setBoard: history => ({
    type: actions.SET_BOARD,
    payload: history
  }),
  setStepNumber: value => ({
    type: actions.SET_STEP_NUMBER,
    payload: value
  })
};

export default actionsCreators;
