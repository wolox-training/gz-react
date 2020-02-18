import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';

import { login } from '../../services/UsersService';
import api, { defaultHeaders } from '../../config/api';

export const actions = createTypes(
  completeTypes(['LOGIN'], ['LOGOUT']),
  '@@LOGIN'
);

const actionsCreators = {
  login: data => ({
    type: actions.LOGIN,
    service: login,
    target: 'token',
    payload: data,
    injections: [
      withPostSuccess((dispatch, response) => {
        localStorage.setItem('token', response.data.token);
        api.setHeader('token', response.data.token);
      })
    ]
  }),
  closeSession: () => dispatch => {
    localStorage.removeItem('token');
    api.setHeaders(defaultHeaders);
    dispatch(actionsCreators.logout());
  },
  logout: () => ({
    type: actions.LOGOUT
  })
};

/*

*/

export default actionsCreators;
