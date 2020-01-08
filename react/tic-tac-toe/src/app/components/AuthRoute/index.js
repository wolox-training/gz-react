import React from 'react';
import { Redirect, Route } from 'react-router';

import { loggedIn } from '../../screens/Login/utils';


function AuthRoute({ privateComponent: PrivateComponent, ...props }) {
  return loggedIn() ? <Route {...props} component={PrivateComponent} /> : <Redirect to="/" />;
}

export default AuthRoute;
