export const PLAYER_ONE = 'player_one';
export const PLAYER_TWO = 'player_two';
export const TIE = 'tie';

export const ROUTES = {
  LOGIN: '/',
  GAME: '/game',
  PLAYERS: '/players'
};

export const DEFAULT_PLAYER_STATES = {
  [PLAYER_ONE]: { won: 0, tie: 0, lost: 0 },
  [PLAYER_TWO]: { won: 0, tie: 0, lost: 0 }
};
