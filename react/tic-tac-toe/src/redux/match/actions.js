import { completeTypes, createTypes } from 'redux-recompose';

import getMatches from '../../services/MatchesService';

export const actions = createTypes(
  completeTypes(['GET_MATCHES'], ['SET_BOARD', 'JUMP_TO']),
  '@@MATCHES'
);

const actionsCreators = {
  getMatches: () => ({
    type: actions.GET_MATCHES,
    target: 'matches',
    service: getMatches
  }),
  setBoard: index => ({
    type: actions.SET_BOARD,
    payload: index
  }),
  jumpTo: value => ({
    type: actions.JUMP_TO,
    payload: value
  })
};

export default actionsCreators;
