/* eslint-disable no-mixed-operators */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func } from 'prop-types';

import CustomInput from '../CustomInput';

import { defaultEmailValidation, defaultPasswordValidation } from './utils';
import styles from './styles.scss';

function LoginForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className={styles.column}>
      <Field name="email" component={CustomInput} validate={defaultEmailValidation} type="email" label="Email" />
      <Field name="password" component={CustomInput} validate={defaultPasswordValidation} type="password" label="Password" />
      <button type="submit" className={styles.submit}>Submit</button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: func.isRequired
};

export default reduxForm({
  form: 'login'
})(LoginForm);
