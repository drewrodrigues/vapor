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
    steamId: state.session.user.steamId
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