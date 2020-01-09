import login from '../../services/UsersService';
import api from '../../config/api';


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
      localStorage.setItem('token', response.data.token);
      dispatch({ type: actions.LOGIN_SUCCESS, payload: response.data.token });
      api.setHeader('token', response.data.token);
    } else {
      dispatch({ type: actions.LOGIN_FAILURE });
    }
  }
};

export default actionsCreators;
