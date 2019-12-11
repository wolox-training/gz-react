import React from 'react';
import ReactDOM from 'react-dom';
import App from '@screens/App';
import { Provider } from 'react-redux';
import store from '@redux/store';

import './scss/index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
