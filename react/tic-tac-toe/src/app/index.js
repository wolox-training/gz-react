import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { history } from '../redux/store';

import Game from './screens/Game';
import Login from './screens/Login';
import AuthRoute from './components/AuthRoute';
import { loggedIn } from './screens/Login/utils';

class App extends Component {
  renderLogin = () => loggedIn() ? <Redirect to="/game" /> : <Login />;

  render() {
    return (
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={this.renderLogin} />
            <AuthRoute path="/game" privateComponent={Game} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    );
  }
}

export default App;
