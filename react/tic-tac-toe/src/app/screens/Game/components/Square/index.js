/* eslint-disable react/prop-types */
import React from 'react';

import styles from './styles.module.scss';

const Square = (props) => (
  <button type="button" className={styles.square}>
    { props.value }
  </button>
);

export default Square;
