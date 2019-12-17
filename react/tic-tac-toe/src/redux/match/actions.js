export const actions = {
  SET_BOARD: '@@MATCH/SET_BOARD',
  JUMP_TO: '@@MATCH/JUMP_TO',
  GET_MATCH_HISTORY: '@@MATCH/GET_MATCH_HISTORY'
};

const actionsCreators = {
  setBoard: index => ({
    type: actions.SET_BOARD,
    payload: index
  }),
  jumpTo: value => ({
    type: actions.JUMP_TO,
    payload: value
  }),
  getMatchHistory: response => ({
    type: actions.GET_MATCH_HISTORY,
    payload: response
  })
};

export default actionsCreators;
