import { actions } from './actions';

const initialState = {
  error: false,
  loading: false
};

function users(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loading: true };
    case actions.LOGIN_FAILURE:
      return { ...state, loading: false, error: true };
    case actions.LOGIN_SUCCESS:
      return { ...state, loading: false, error: false };
    default:
      return state;
  }
}

export default users;
