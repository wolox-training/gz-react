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
    const { setLoading, getMatches } = this.props;
    setLoading(true);
    getMatches();
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
            <MatchHistory matches={matchHistory} isLoading={isLoading} />
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
  isLoading: state.games.isLoading
});

const mapDispatchToProps = dispatch => ({
  setBoard: index => dispatch(actionsCreators.setBoard(index)),
  jumpTo: value => dispatch(actionsCreators.jumpTo(value)),
  getMatchHistory: response => dispatch(actionsCreators.getMatchHistory(response)),
  setLoading: loading => dispatch(actionsCreators.setLoading(loading)),
  getMatches: () => dispatch(actionsCreators.getMatches())
});

Game.propTypes = {
  getMatches: func.isRequired,
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
