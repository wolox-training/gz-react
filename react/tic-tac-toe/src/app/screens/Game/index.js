/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';

import Board from './components/Board';

function getWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  // eslint-disable-next-line no-console
  handleClick = (i) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // eslint-disable-next-line react/no-access-state-in-setstate
    const sq = current.squares.slice();
    // eslint-disable-next-line no-use-before-define
    if (getWinner(sq) || sq[i]) {
      return;
    }
    sq[i] = this.state.xIsNext ? 'X' : 'O';
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ history: history.concat([{ squares: sq }]), stepNumber: history.length, xIsNext: !this.state.xIsNext });
  }

  render() {
    // eslint-disable-next-line prefer-destructuring
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // eslint-disable-next-line no-undef
    const winner = getWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key="move_{step}">
          <button type="button" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>);
    });

    let status = null;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
