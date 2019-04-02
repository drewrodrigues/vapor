import { connect } from 'react-redux'
import Dashboard from './dashboard'

import {
  getProfile,
  clearProfile,
  getOwnedGames
} from '../actions/userDatumActions'

const mapStateToProps = state => {
  const { profile } = state.entities
  return {
    avatarUrl: profile.avatarfull,
    name: profile.realname,
    ownedGames: profile.ownedGames,
    steamId: state.session.user.steamId,
    username: profile.personaname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: steamId => dispatch(getProfile(steamId)),
    getOwnedGames: steamId => dispatch(getOwnedGames(steamId)),
    clearProfile: () => dispatch(clearProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)