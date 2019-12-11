import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import styles from './styles.module.scss';

class Square extends Component {
  handleClick = () => this.props.onClick(this.props.position);

  render() {
    return (
      <button type="button" className={styles.square} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

Square.propTypes = {
  position: PropTypes.number.isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default Square;
