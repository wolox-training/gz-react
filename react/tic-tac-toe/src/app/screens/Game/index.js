import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { func, number, bool, arrayOf, string } from 'prop-types';

import actionsCreators from '../../../redux/match/actions';
import { matchPropType } from '../../../constants/propTypes';

import Board from './components/Board';
import { getWinner } from './utils';
import styles from './styles.module.scss';
import MatchHistory from './components/MatchHistory';
import TopBar from './components/TopBar';


class Game extends Component {
  componentDidMount() {
    this.props.getMatches();
  }

  handleJumpTo = ({ target: { value } }) => this.props.setStepNumber(value);

  handleClick = index => {
    const { history, stepNumber, xIsNext } = this.props;
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = [...newHistory[newHistory.length - 1].squares];
    if (!(getWinner(squares) || squares[index])) {
      squares[index] = xIsNext ? 'X' : 'O';
      this.props.setBoard([...newHistory, { squares }]);
      this.props.setStepNumber(newHistory.length);
    }
  }

  getMoves = (history) => history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={`move_${move + 1}`}>
        <button type="button" value={move} onClick={this.handleJumpTo}>{desc}</button>
      </li>);
  });

  render() {
    const { history, stepNumber, xIsNext, matchHistory, matchesLoading } = this.props;
    const squares = [...history[stepNumber].squares];
    const winner = getWinner(squares);
    const moves = this.getMoves(history);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    return (
      <Fragment>
        <TopBar />
        <div className={`row ${styles.game}`}>
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
            <MatchHistory matches={matchHistory} isLoading={matchesLoading} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  history: state.games.history,
  stepNumber: state.games.stepNumber,
  xIsNext: state.games.xIsNext,
  matchHistory: state.games.matches,
  matchesLoading: state.games.matchesLoading
});

const mapDispatchToProps = dispatch => ({
  setBoard: history => dispatch(actionsCreators.setBoard(history)),
  setStepNumber: value => dispatch(actionsCreators.setStepNumber(value)),
  jumpTo: value => dispatch(actionsCreators.jumpTo(value)),
  getMatchHistory: response => dispatch(actionsCreators.getMatchHistory(response)),
  getMatches: () => dispatch(actionsCreators.getMatches())
});

Game.propTypes = {
  getMatches: func.isRequired,
  setBoard: func.isRequired,
  setStepNumber: func.isRequired,
  history: arrayOf(arrayOf(string)),
  matchesLoading: bool,
  matchHistory: arrayOf(matchPropType),
  stepNumber: number,
  xIsNext: bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
