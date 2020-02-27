import React from 'react';
import Spinner from 'react-spinkit';

function withLoading(Component) {
  return function loading({ isLoading, ...props }) {
    return isLoading ? <Spinner name="three-bounce" color="purple" /> : <Component {...props} />;
  };
}

export default withLoading;
