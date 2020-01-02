import login from '../../services/UsersService';

export const actions = {
  LOGIN: '@@LOGIN/LOGIN',
  LOGIN_FAILURE: '@@LOGIN/LOGIN_FAILURE',
  LOGIN_SUCCESS: '@@LOGIN/LOGIN_SUCESS'
};

const actionsCreators = {
  login: data => async dispatch => {
    dispatch({ type: actions.LOGIN });
    const response = await login(data);
    if (response.ok) {
      dispatch({ type: actions.LOGIN_SUCCESS });
    } else {
      dispatch({ type: actions.LOGIN_FAILURE });
    }
  }
};

export default actionsCreators;
