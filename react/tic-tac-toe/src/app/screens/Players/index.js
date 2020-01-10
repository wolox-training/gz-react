import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf } from 'prop-types';

import getMatches from '../../../services/MatchesService';
import actionsCreators from '../../../redux/match/actions';
import TopBar from '../Game/components/TopBar';
import { matchPropType } from '../../../constants/propTypes';
import { PLAYER_ONE, TIE } from '../../../constants/gameConstants';
import { history } from '../../../redux/store';

import styles from './styles.module.scss';


class Players extends Component {
  componentDidMount() {
    if (this.props.matchHistory.length === 0) {
      const { getMatchHistory } = this.props;
      getMatches()
        .then(response => getMatchHistory(response));
    }
  }

  getPlayersMatches() {
    const players = [{ won: 0, tie: 0, lost: 0 }, { won: 0, tie: 0, lost: 0 }];
    this.props.matchHistory.forEach((match) => {
      if (match.winner === TIE) {
        players[0].tie++;
        players[1].tie++;
      } else if (match.winner === PLAYER_ONE) {
        players[0].won++;
        players[1].lost++;
      } else {
        players[0].lost++;
        players[1].won++;
      }
    });
    return players;
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
  history: state.games.history,
  matchHistory: state.games.matches
});

const mapDispatchToProps = dispatch => ({
  getMatchHistory: response => dispatch(actionsCreators.getMatchHistory(response))
});

Players.propTypes = {
  getMatchHistory: func.isRequired,
  matchHistory: arrayOf(matchPropType)
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
