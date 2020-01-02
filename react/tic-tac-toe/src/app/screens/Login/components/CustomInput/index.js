import React, { Fragment } from 'react';

function CustomInput({ label, input, type, meta: { touched, error } }) {
  return (
    <Fragment>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {touched && (error && <span>{error}</span>)}
      </div>
    </Fragment>
  );
}

export default CustomInput;
