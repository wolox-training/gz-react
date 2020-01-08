import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import actionsCreators from '../../../../../redux/match/actions';

import styles from './styles.module.scss';


class TopBar extends Component {
  handleClick = () => this.logout();

  render() {
    return (
      <ul className={`row ${styles.navbar}`}>
        <li className={styles.option}><Link to="/game">Game</Link></li>
        <li className={styles.option}><Link to="/players">Players</Link></li>
        <li className={styles.option}><button type="button" onClick={this.handleClick}>Logout</button></li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionsCreators.logout())
});

export default connect(mapDispatchToProps)(TopBar);
