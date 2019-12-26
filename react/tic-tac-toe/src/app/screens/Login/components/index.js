/* eslint-disable no-mixed-operators */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func } from 'prop-types';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters at least';
  }
  return errors;
};

const renderField = ({
  input,
  type,
  meta: { touched, error }
}) => (
  <div>
    <div>
      <input {...input} type={type} />
      {touched &&
      (error && <span>{error}</span>)}
    </div>
  </div>
);

// eslint-disable-next-line react/no-multi-comp
const LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component={renderField} type="email" label="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component={renderField} type="password" label="Password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: func.isRequired
};

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);
