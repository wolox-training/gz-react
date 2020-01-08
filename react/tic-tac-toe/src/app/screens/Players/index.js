import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf } from 'prop-types';

import getMatches from '../../../services/MatchesService';
import actionsCreators from '../../../redux/match/actions';
import TopBar from '../Game/components/TopBar';
import { matchPropType } from '../../../constants/propTypes';


class Players extends Component {
  componentDidMount() {
    if (this.props.matchHistory.length === 0) {
      const { getMatchHistory } = this.props;
      getMatches()
        .then(response => getMatchHistory(response));
    }
  }

  getPlayersMatches() {
    const players = {
      playerOne: { won: 0, tie: 0, lost: 0 },
      playerTwo: { won: 0, tie: 0, lost: 0 }
    };
    this.props.matchHistory.forEach((match) => {
      if (match.winner === 'tie') {
        players.playerOne.tie++;
        players.playerTwo.tie++;
      } else if (match.winner === 'player_one') {
        players.playerOne.won++;
        players.playerTwo.lost++;
      } else {
        players.playerOne.lost++;
        players.playerTwo.won++;
      }
    });
    return players;
  }

  render () {
    return (
      <Fragment>
        <TopBar />
        <h2>Players</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Won</th>
              <th>Tied</th>
              <th>Lost</th>
            </tr>
          </thead>
          <tbody />
        </table>
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
