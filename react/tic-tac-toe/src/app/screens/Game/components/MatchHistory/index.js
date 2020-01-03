/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { arrayOf, bool } from 'prop-types';
import Spinner from 'react-spinkit';

import { matchPropType } from '../../../../../constants/propTypes';
import { PLAYER_ONE, TIE } from '../../../../../constants/gameConstants';

import styles from './styles.module.scss';

class MatchHistory extends Component {
  renderMatches() {
    return this.props.matches.map((match, index) => {
      const playerOneClass = match.winner === TIE ? styles.tie : match.winner === PLAYER_ONE ? styles.winner : styles.loser;
      const playerTwoClass = match.winner === TIE ? styles.tie : match.winner === PLAYER_ONE ? styles.loser : styles.winner;
      return (
        <li key={`move_${index + 1}`}>
          <span className={playerOneClass}>{match.player_one}</span>
          <span className={playerTwoClass}>{match.player_two}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Match history</h2>
        {this.props.isLoading ? <Spinner name="three-bounce" color="purple" /> : <ol className={styles.list}>{this.renderMatches()}</ol> }
      </Fragment>);
  }
}

MatchHistory.propTypes = {
  isLoading: bool,
  matches: arrayOf(matchPropType)
};

export default MatchHistory;