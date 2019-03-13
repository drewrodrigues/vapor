import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/sessionActions'

import SteamSignInButtom from '../assets/steam-sign-in.png'
import Searchbar from './search/searchbar';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.logoutUser = this.logoutUser.bind(this)
    this.getLinks   = this.getLinks.bind(this)
  }

  logoutUser(e) {
    e.preventDefault()
    this.props.logout()
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="session">
          <Link to="/">Search</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={ this.logoutUser }>Logout</button>
        </div>
      )
    } else {
      return (
        <div className="session">
          <a href="http://localhost:5000/api/auth/steam"> {/* FIXME: proxy not working */}
            <img src={ SteamSignInButtom } alt="Sign in through steam" className="navbar-signin"/>
          </a>
        </div>
      )
    }
  }

  render() {
    return(
      <nav className="navbar">
        <h3 className="vapor-title">Vapor</h3>
        <Searchbar />
        { this.getLinks() }
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)