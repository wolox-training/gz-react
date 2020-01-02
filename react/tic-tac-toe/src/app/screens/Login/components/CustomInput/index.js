import React, { Fragment } from 'react';

import styles from './styles.module.scss';

function CustomInput({ label, input, type, meta: { touched, error } }) {
  return (
    <Fragment>
      <label>{label}</label>
      <div className={styles.row}>
        <input {...input} type={type} />
        {touched && (error && <span>{error}</span>)}
      </div>
    </Fragment>
  );
}

export default CustomInput;
