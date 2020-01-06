import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { history } from '../redux/store';

import Game from './screens/Game';
import Login from './screens/Login';

function App() {
  const loggedIn = localStorage.getItem('token');
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            { loggedIn ? <Redirect to="/game" /> : <Login />}
          </Route>
          <Route path="/game">
            { loggedIn ? <Game /> : <Redirect to="/" /> }
          </Route>
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

export default App;
