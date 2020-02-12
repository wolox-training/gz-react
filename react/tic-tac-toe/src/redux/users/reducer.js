import { actions } from './actions';

const initialState = {
  error: false,
  token: localStorage.getItem('token')
};

function users(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state };
    case actions.LOGIN_FAILURE:
      return { ...state, error: true };
    case actions.LOGIN_SUCCESS:
      return { ...state, error: false, token: action.payload };
    case actions.LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}

export default users;
