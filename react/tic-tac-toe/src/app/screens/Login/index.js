import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import actionsCreators from '../../../redux/users/actions';

import LoginForm from './components/LoginForm';


class Login extends Component {
  handleLogin = values => {
    const { login } = this.props;
    login(values);
  }

  render() {
    return <LoginForm onSubmit={this.handleLogin} />;
  }
}

const mapStateToProps = state => ({
  loading: state.users.loading,
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actionsCreators.login(data))
});

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
