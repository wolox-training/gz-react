/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { arrayOf } from 'prop-types';

import withLoading from '../../../../components/WithLoading';
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
        <ol className={styles.list}>{this.renderMatches()}</ol>
      </Fragment>);
  }
}

MatchHistory.propTypes = {
  matches: arrayOf(matchPropType)
};

export default withLoading(MatchHistory);
