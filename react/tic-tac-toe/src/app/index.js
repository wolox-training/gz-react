import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, BrowserRouter } from 'react-router-dom';

import { history } from '../redux/store';

import Game from './screens/Game';
import Login from './screens/Login';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path="/" component={Login} redirectPath="/game" loginComponent />
          <AuthRoute path="/game" component={Game} redirectPath="/" />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

export default App;
