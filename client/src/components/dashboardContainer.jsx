import { connect } from 'react-redux'
import Dashboard from './dashboard'

import { getOwnedGames } from '../actions/userDatumActions'

import { topGames } from '../reducers/selectors'

const mapStateToProps = state => {
  const { profile } = state.entities
  return {
    steamId: state.session.user.steamId,
    topGames: topGames(profile.ownedGames)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOwnedGames: steamId => dispatch(getOwnedGames(steamId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)