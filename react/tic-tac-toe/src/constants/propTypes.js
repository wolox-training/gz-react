import { string, number, shape } from 'prop-types';

export const matchPropType = shape({
  id: number,
  playerOne: string,
  playerTwo: string,
  winner: string,
  createdAt: string
});
