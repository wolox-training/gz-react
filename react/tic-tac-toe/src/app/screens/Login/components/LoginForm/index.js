/* eslint-disable no-mixed-operators */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func, bool } from 'prop-types';

import CustomInput from '../CustomInput';

import { defaultEmailValidation, defaultPasswordValidation } from './utils';
import styles from './styles.module.scss';

function LoginForm({ handleSubmit, hasError }) {
  return (
    <form onSubmit={handleSubmit} className={styles.column}>
      <Field name="email" component={CustomInput} validate={defaultEmailValidation} type="email" label="Email" />
      <Field name="password" component={CustomInput} validate={defaultPasswordValidation} type="password" label="Password" />
      <button type="submit" className={styles.submit}>Submit</button>
      {hasError && <h3 className={styles.errorMsg}>Login failed. Email or password are wrong.</h3>}
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  hasError: bool
};

export default reduxForm({
  form: 'login'
})(LoginForm);

