import getMatches from '../../services/MatchesService';

export const actions = {
  SET_BOARD: '@@MATCH/SET_BOARD',
  JUMP_TO: '@@MATCH/JUMP_TO',
  GET_MATCH_HISTORY: '@@MATCH/GET_MATCH_HISTORY',
  SET_LOADING: '@@MATCH/SET_LOADING',
  GET_MATCHES: '@@MATCH/GET_MATCHES',
  GET_MATCHES_SUCCESS: '@@MATCH/GET_MATCHES_SUCCESS',
  GET_MATCHES_FAILURE: '@@MATCH/GET_MATCHES_FAILURE'
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
  }),
  setLoading: loading => ({
    type: actions.SET_LOADING,
    payload: loading
  }),
  getMatches: () => async dispatch => {
    const response = await getMatches();
    if (response.ok) {
      dispatch({ type: actions.GET_MATCHES_SUCCESS, payload: response });
    } else {
      dispatch({ type: actions.GET_MATCHES_FAILURE, errorMatches: true });
    }
  }
};

export default actionsCreators;
