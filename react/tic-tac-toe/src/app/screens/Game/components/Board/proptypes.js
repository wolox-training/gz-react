import { PropTypes } from 'prop-types';

export const squarePropTypes = PropTypes.shape({
  position: PropTypes.number,
  value: PropTypes.string,
  onClick: PropTypes.func
});
