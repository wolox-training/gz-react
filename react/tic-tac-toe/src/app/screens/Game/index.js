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

  handleJumpTo = e => {
    this.setState({
      stepNumber: e.target.value,
      xIsNext: e.target.value % 2 === 0
    });
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const sq = current.squares.slice();
    if (getWinner(sq) || sq[i]) {
      return;
    }
    sq[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(({ xIsNext }) => ({ history: history.concat([{ squares: sq }]), stepNumber: history.length, xIsNext: !xIsNext }));
  }

  render() {
    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const winner = getWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={`move_${step}`}>
          <button type="button" value={move} onClick={this.handleJumpTo}>{desc}</button>
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
            onClick={this.handleClick}
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
