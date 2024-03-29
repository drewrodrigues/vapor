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
    let { pathname, loggedIn } = this.props;
    if (loggedIn) {
      return (
        <div className="session">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Search</Link>
          <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          <button onClick={ this.logoutUser }>Logout</button>
        </div>
      )
    } else {
      return (
        <div className="session">
          <a href={ this.steamAuthUrl() }>
            <img src={ SteamSignInButtom } alt="Sign in through steam" className="navbar-signin"/>
          </a>
        </div>
      )
    }
  }

  steamAuthUrl() {
    if (process.env.NODE_ENV === "production") {
      return "https://vapor-js.herokuapp.com/api/auth/steam"
    } else {
      return "http://localhost:5000/api/auth/steam"
    }
  }

  render() {
    return(
      <nav className="navbar">
        <h3 className="vapor-title">VAPOR</h3>
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
