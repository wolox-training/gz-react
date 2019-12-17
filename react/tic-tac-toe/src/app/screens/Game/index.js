import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, bool, arrayOf, string } from 'prop-types';

import matches from '../../../services/MatchesService';
import actionsCreators from '../../../redux/match/actions';
import { matchPropType } from '../../../constants/propTypes';

import Board from './components/Board';
import { getWinner } from './utils';
import styles from './styles.module.scss';
import MatchHistory from './components/MatchHistory';


class Game extends Component {
  componentDidMount() {
    matches.getMatches()
      .then(response => this.props.getMatchHistory(response));
  }

  handleJumpTo = e => this.props.jumpTo(e.target.value);

  handleClick = i => this.props.setBoard(i);

  getMoves = (history) => history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={`move_${move + 1}`}>
        <button type="button" value={move} onClick={this.handleJumpTo}>{desc}</button>
      </li>);
  });

  render() {
    const { history, stepNumber, xIsNext, matchHistory } = this.props;
    const squares = history[stepNumber].squares.slice();
    const winner = getWinner(squares);
    const moves = this.getMoves(history);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    return (
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <Board
            squares={squares}
            onClick={this.handleClick}
          />
        </div>
        <div className={styles.gameInfo}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className={styles.matchHistory}>
          <MatchHistory matches={matchHistory} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  matchHistory: state.matches
});

const mapDispatchToProps = dispatch => ({
  setBoard: index => dispatch(actionsCreators.setBoard(index)),
  jumpTo: value => dispatch(actionsCreators.jumpTo(value)),
  getMatchHistory: response => dispatch(actionsCreators.getMatchHistory(response))
});

Game.propTypes = {
  getMatchHistory: func,
  history: arrayOf(arrayOf(string)),
  jumpTo: func,
  matchHistory: arrayOf(matchPropType),
  setBoard: func,
  stepNumber: number,
  xIsNext: bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
