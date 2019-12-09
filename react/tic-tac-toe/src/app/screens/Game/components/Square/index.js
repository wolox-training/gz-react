import React, { Component } from 'react';
import { string, func, number } from 'prop-types';

import styles from './styles.module.scss';

class Square extends Component {
  handleClick = () => {
    this.props.onClick(this.props.position);
  }

  render() {
    const { value } = this.props;
    return (
      <button type="button" className={styles.square} onClick={this.handleClick}>
        {value}
      </button>
    );
  }
}

Square.propTypes = {
  position: number,
  value: string,
  onClick: func
};

export default Square;
