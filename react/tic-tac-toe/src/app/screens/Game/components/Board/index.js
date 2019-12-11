import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Square from '../Square';

import styles from './styles.module.scss';
import { squarePropTypes } from './proptypes';

class Board extends Component {
  renderSquare = (i) => <Square value={this.props.squares[i]} position={i} onClick={this.props.onClick} />;

  render() {
    return (
      <div>
        <div className={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(squarePropTypes).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Board;
