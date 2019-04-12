import React from 'react'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    const { steamId, getProfile, getStats } = this.props
    getProfile(steamId)
    getStats()
  }

  componentWillUnmount() {
    const { clearProfile } = this.props
    clearProfile()
  }

  render() {
    const {
      avatarUrl,
      averageAchievements,
      averageGames,
      averagePlaytime,
      name,
      totalTimePlayed,
      username
    } = this.props

    const timePlayed = totalTimePlayed != 0 ? <>
      <p className="dashboard-timePlayed">Total time played: { totalTimePlayed } hours</p>
    </> : null

    return name ? <>
      <header className="dashboard-header clear">
        <img src={ avatarUrl } className="dashboard-avatar"/>
        <h3 className="dashboard-name">{ name } | { username }</h3>
        { timePlayed }

        <ul>
          <li>averageAchievements: { averageAchievements }</li>
          <li>averageGames: { averageGames }</li>
          <li>averagePlaytime: { averagePlaytime }</li>
        </ul>
      </header>
    </> : null
  }
}

export default Profile