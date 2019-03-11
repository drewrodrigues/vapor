import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/sessionActions'

import SteamSignInButtom from '../assets/steam-sign-in.png'

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
        <div>
          <Link to="/">Search</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={ this.logoutUser }>Logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <a href="http://localhost:5000/api/auth/steam"> {/* FIXME: proxy not working */}
            <img src={ SteamSignInButtom } alt="Sign in through steam" className="navbar-signin"/>
          </a>
        </div>
      )
    }
  }

  render() {
    return(
      <nav>
        <h3>Navbar</h3>
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