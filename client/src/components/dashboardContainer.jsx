import { connect } from 'react-redux'
import Dashboard from './dashboard'

import {
  getProfile,
  clearProfile,
  getOwnedGames
} from '../actions/userDatumActions'
import { getStats } from '../actions/statActions'

import { 
  topGames,
  totalTimePlayed
} from '../reducers/selectors'

const mapStateToProps = state => {
  const { profile } = state.entities
  return {
    avatarUrl: profile.avatarfull,
    name: profile.realname,
    steamId: state.session.user.steamId,
    topGames: topGames(profile.ownedGames),
    totalTimePlayed: totalTimePlayed(profile.ownedGames),
    username: profile.personaname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: steamId => dispatch(getProfile(steamId)),
    getOwnedGames: steamId => dispatch(getOwnedGames(steamId)),
    clearProfile: () => dispatch(clearProfile()),
    getStats: () => dispatch(getStats())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)