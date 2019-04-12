import { connect } from 'react-redux'
import Profile from './profile'
import { getStats } from '../../actions/statActions'
import { getProfile, clearProfile } from '../../actions/userDatumActions'

import {
  totalAchievements,
  totalTimePlayed,
  percentageAchievementsCompleted
} from '../../reducers/selectors'

const mapStateToProps = state => {
  const { profile, stats } = state.entities

  return {
    avatarUrl: profile.avatarfull,
    achievements: totalAchievements(profile.ownedGames),
    percentageAchievementsCompleted: percentageAchievementsCompleted(profile.ownedGames),
    averageAchievements: stats.averageAchievements,
    averageGames: stats.averageGames,
    averagePlaytime: stats.averagePlaytime,
    name: profile.realname,
    steamId: state.session.user.steamId,
    username: profile.personaname,
    totalAchievements: totalAchievements(profile.ownedGames),
    totalTimePlayed: totalTimePlayed(profile.ownedGames),
    totalGames: profile.ownedGames ? profile.ownedGames.length : 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: steamId => dispatch(getProfile(steamId)),
    getStats: () => dispatch(getStats()),
    clearProfile: () => dispatch(clearProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)