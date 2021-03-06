import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actionsCreators from '../../../../../redux/users/actions';
import { ROUTES } from '../../../../../constants/gameConstants';

import styles from './styles.module.scss';


class TopBar extends Component {
  handleClick = () => this.props.logout();

  render() {
    return (
      <ul className={`row ${styles.navbar}`}>
        <li className={styles.menuOption}><Link to={ROUTES.GAME}>Game</Link></li>
        <li className={styles.menuOption}><Link to={ROUTES.PLAYERS}>Players</Link></li>
        <li className={styles.menuOption}><button type="button" onClick={this.handleClick}>Logout</button></li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionsCreators.closeSession())
});

TopBar.propTypes = {
  logout: func.isRequired
};

export default connect(null, mapDispatchToProps)(TopBar);
