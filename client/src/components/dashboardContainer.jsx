import { connect } from 'react-redux'
import Dashboard from './dashboard'

import {
  getProfile,
  clearProfile
} from '../actions/userDatumActions'

const mapStateToProps = state => {
  const profile = state.entities.profile
  return {
    avatarUrl: profile.avatarfull,
    name: profile.realname,
    steamId: state.session.user.steamId,
    username: profile.personaname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: steamId => dispatch(getProfile(steamId)),
    clearProfile: () => dispatch(clearProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)