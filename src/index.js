/* eslint-disable import/default */
import React from 'react';
import ReactDOM from 'react-dom';

import store, { history } from './redux/store';
import App from './App';
import './App.scss';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);