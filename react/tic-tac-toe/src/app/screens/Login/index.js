import React, { Component } from 'react';

import LoginForm from './components';

class Login extends Component {
  handleSubmit = values => {
    console.log(values);
  }

  render() {
    return <LoginForm onSubmit={this.handleSubmit} />;
  }
}

export default Login;
