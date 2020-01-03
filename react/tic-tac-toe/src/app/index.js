import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { history } from '../redux/store';

import Game from './screens/Game';
import Login from './screens/Login';

function App() {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

export default App;
