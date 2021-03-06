import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, BrowserRouter } from 'react-router-dom';

import { history } from '../redux/store';
import { ROUTES } from '../constants/gameConstants';

import Game from './screens/Game';
import Login from './screens/Login';
import AuthRoute from './components/AuthRoute';
import Players from './screens/Players';


function App() {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path={ROUTES.LOGIN} component={Login} redirectPath={ROUTES.GAME} loginComponent />
          <AuthRoute path={ROUTES.GAME} component={Game} redirectPath={ROUTES.LOGIN} />
          <AuthRoute path={ROUTES.PLAYERS} component={Players} redirectPath={ROUTES.LOGIN} />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

export default App;
