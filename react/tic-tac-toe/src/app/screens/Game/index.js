import React, { Component } from 'react';

import Board from './components/Board';
import { getWinner } from './utils';
import styles from './styles.module.scss';

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
  }

  handleJumpTo = e => {
    this.setState({
      stepNumber: e.target.value,
      xIsNext: e.target.value % 2 === 0
    });
  }

  handleClick = i => {
    const { history, stepNumber, xIsNext } = this.state;
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = [...newHistory[newHistory.length - 1].squares];
    if (getWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({ history: [...newHistory, { squares }], stepNumber: newHistory.length, xIsNext: !xIsNext });
  }

  getMoves = (history) => history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={`move_${move + 1}`}>
        <button type="button" value={move} onClick={this.handleJumpTo}>{desc}</button>
      </li>);
  });

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = [...history[stepNumber]];
    const winner = getWinner(current.squares);
    const moves = this.getMoves(history);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    return (
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <Board
            squares={current.squares}
            onClick={this.handleClick}
          />
        </div>
        <div className={styles.gameInfo}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
