import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool } from 'prop-types';

function AuthRoute({ component: Component, redirectPath, loginComponent, loggedIn, ...props }) {
  let route = loggedIn ? <Route {...props} component={Component} /> : <Redirect to={redirectPath} />;
  if (loginComponent) {
    route = loggedIn ? <Redirect to={redirectPath} /> : <Route {...props} component={Component} />;
  }
  return route;
}

const mapStateToProps = state => ({
  loggedIn: state.users.token
});

AuthRoute.propTypes = {
  loggedIn: bool
};

export default connect(mapStateToProps)(AuthRoute);
