import React, { Component } from 'react';
<<<<<<< HEAD
=======
import logo from '../assets/logo.svg';
import '../stylesheets/app.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Landing from './landing'
>>>>>>> Bootstrap steam login when componentWillMount

class App extends Component {
  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <a href="http://localhost:5000/api/auth/steam">Login with steam</a>
        <Switch>
          <Route path="/" component={ Landing } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
