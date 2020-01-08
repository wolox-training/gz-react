import React, { Fragment } from 'react';

import styles from './styles.module.scss';

function CustomInput({ label, input, type, meta: { touched, error } }) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <input {...input} placeholder={label} type={type} className={styles.input} />
        {touched && (error && <span className={styles.error}>{error}</span>)}
      </div>
    </Fragment>
  );
}

export default CustomInput;
