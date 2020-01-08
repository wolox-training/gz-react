import { push } from 'connected-react-router';

import { login } from '../../services/UsersService';
import api, { defaultHeaders } from '../../config/api';
import { ROUTES } from '../../constants/gameConstants';

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
  },
  logout: () => dispatch => {
    localStorage.removeItem('token');
    api.setHeaders(defaultHeaders);
    dispatch(push('/'));
  }
};

export default actionsCreators;
