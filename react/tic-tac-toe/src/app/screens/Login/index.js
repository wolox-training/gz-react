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
    return <LoginForm onSubmit={this.handleLogin} hasError={this.props.error} />;
  }
}

const mapStateToProps = state => ({
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actionsCreators.login(data))
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
