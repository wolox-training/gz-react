import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, bool, arrayOf, string } from 'prop-types';

import getMatches from '../../../services/MatchesService';
import actionsCreators from '../../../redux/match/actions';
import { matchPropType } from '../../../constants/propTypes';

import Board from './components/Board';
import { getWinner } from './utils';
import styles from './styles.module.scss';
import MatchHistory from './components/MatchHistory';


class Game extends Component {
  componentDidMount() {
    const { setLoading, getMatchHistory } = this.props;
    setLoading(true);
    getMatches()
      .then(response => getMatchHistory(response));
  }

  handleJumpTo = ({ target: { value } }) => this.props.jumpTo(value);

  handleClick = i => this.props.setBoard(i);

  getMoves = (history) => history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={`move_${move + 1}`}>
        <button type="button" value={move} onClick={this.handleJumpTo}>{desc}</button>
      </li>);
  });

  render() {
    const { history, stepNumber, xIsNext, matchHistory, isLoading } = this.props;
    const squares = [...history[stepNumber].squares];
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
          <MatchHistory matches={matchHistory} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.matches.history,
  stepNumber: state.matches.stepNumber,
  xIsNext: state.matches.xIsNext,
  matchHistory: state.matches.matches,
  isLoading: state.matches.isLoading
});

const mapDispatchToProps = dispatch => ({
  setBoard: index => dispatch(actionsCreators.setBoard(index)),
  jumpTo: value => dispatch(actionsCreators.jumpTo(value)),
  getMatchHistory: response => dispatch(actionsCreators.getMatchHistory(response)),
  setLoading: loading => dispatch(actionsCreators.setLoading(loading))
});

Game.propTypes = {
  getMatchHistory: func.isRequired,
  jumpTo: func.isRequired,
  setBoard: func.isRequired,
  setLoading: func.isRequired,
  history: arrayOf(arrayOf(string)),
  isLoading: bool,
  matchHistory: arrayOf(matchPropType),
  stepNumber: number,
  xIsNext: bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
