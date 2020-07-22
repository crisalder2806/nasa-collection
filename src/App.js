import './App.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import HomeContainer from './containers/HomeContainer';
import SearchContainer from './containers/SearchContainer';

export default class App extends Component {
  render() {
    const { store, history } = this.props;
    return(
      <Provider store={store}>
        <HashRouter history={history}>
          <Switch>
            <Route path="/" component={HomeContainer} exact/>
            <Route path="/search" component={SearchContainer} exact/>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};