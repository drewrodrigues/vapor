import React, { Component } from 'react';
import queryString from 'query-string'
import "../stylesheets/application.scss"
import { connect } from 'react-redux'
import { login } from '../actions/sessionActions'
import { ProtectedRoute } from '../util/routeUtil'
import { Route, Switch, withRouter } from 'react-router-dom'

import Dashboard from './dashboard'
import LandingContainer from './landing'
import Navbar from './navbar'

class App extends Component {
  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      this.props.login(query.token)
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/dashboard" component={ Dashboard } />
          <Route path="/" component={ LandingContainer } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  { login }
)(App))