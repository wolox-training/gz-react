import React from 'react';
import { string, func } from 'prop-types';

import styles from './styles.module.scss';

function Square(props) {
  return (
    <button type="button" className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: string,
  onClick: func
};

export default Square;
