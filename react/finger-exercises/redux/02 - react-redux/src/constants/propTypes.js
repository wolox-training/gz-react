import { shape, string, number } from 'prop-types';

export const bookSelectedPropType = shape({
  name: string,
  summary: string,
  quantity: number
});

export const bookPropType = shape({
  id: number.isRequired,
  name: string.isRequired,
  author: string.isRequired,
  year: number.isRequired,
  image: string.isRequired,
  summary: string.isRequired
});
