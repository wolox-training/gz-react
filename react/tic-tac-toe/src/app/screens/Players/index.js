import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf } from 'prop-types';

import actionsCreators from '../../../redux/match/actions';
import TopBar from '../Game/components/TopBar';
import { matchPropType } from '../../../constants/propTypes';
import { PLAYER_ONE, PLAYER_TWO, TIE, DEFAULT_PLAYER_STATES } from '../../../constants/gameConstants';
import { history } from '../../../redux/store';

import styles from './styles.module.scss';


class Players extends Component {
  componentDidMount() {
    const { matchHistory, getMatches } = this.props;
    if (matchHistory.length === 0) {
      getMatches();
    }
  }

  getMatchResult(match) {
    if (match.winner === TIE) {
      return { winner: false, loser: false };
    } else if (match.winner === PLAYER_ONE) {
      return { winner: PLAYER_ONE, loser: PLAYER_TWO };
    }
    return { winner: PLAYER_TWO, loser: PLAYER_ONE };
  }

  getPlayersMatches() {
    this.props.matchHistory.forEach((match) => {
      const { winner, loser } = this.getMatchResult(match);
      if (winner) {
        DEFAULT_PLAYER_STATES[winner].won++;
        DEFAULT_PLAYER_STATES[loser].lost++;
      } else {
        DEFAULT_PLAYER_STATES[PLAYER_ONE].tie++;
        DEFAULT_PLAYER_STATES[PLAYER_TWO].tie++;
      }
    });
    return [DEFAULT_PLAYER_STATES[PLAYER_ONE], DEFAULT_PLAYER_STATES[PLAYER_TWO]];
  }

  renderPlayers() {
    const players = this.getPlayersMatches();
    return players.map((item, i) => (
      <tr className={styles.playerRow} key={`match_${i + 1}`}>
        <td>{`Player ${i + 1}`}</td>
        <td>{item.won}</td>
        <td>{item.tie}</td>
        <td>{item.lost}</td>
      </tr>
    ));
  }

  handleGoBack() {
    history.goBack();
  }

  render () {
    return (
      <Fragment>
        <TopBar />
        <table className={styles.playersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Won</th>
              <th>Tied</th>
              <th>Lost</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPlayers()}
          </tbody>
        </table>
        <button className={styles.goBack} type="button" onClick={this.handleGoBack}>Back</button>
      </Fragment>);
  }
}

const mapStateToProps = state => ({
  matchHistory: state.games.matches
});

const mapDispatchToProps = dispatch => ({
  getMatches: () => dispatch(actionsCreators.getMatches())
});

Players.propTypes = {
  getMatches: func.isRequired,
  matchHistory: arrayOf(matchPropType)
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
