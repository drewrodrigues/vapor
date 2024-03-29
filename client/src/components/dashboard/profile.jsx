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
      percentageAchievementsCompleted,
      totalAchievements,
      totalTimePlayed,
      totalGames,
      username
    } = this.props

    return name ? <>
      <header className="dashboard-header clear">
        <img src={ avatarUrl } className="dashboard-avatar"/>
        <h3 className="dashboard-username">{ username }</h3>
        <h3 className="dashboard-name">{ name }</h3>
      </header>

      <section className="dashboard-stats clear">
        <h2 className="dashboard-subtitle">
          <i class="fas fa-chart-line"></i>
          Your Stats
        </h2>
        <div className="dashboard-stat dashboard-stat-orange">
          <p className="dashboard-stat-title">
            <i class="fas fa-hourglass-half"></i>
            Hours Played
          </p>
          <span className="dashboard-stat-user orange">{ totalTimePlayed }</span>
          <span className="dashboard-stat-average">{ averagePlaytime } average</span>
        </div>
        <div className="dashboard-stat dashboard-stat-blue">
          <p className="dashboard-stat-title">
            <i class="fas fa-gamepad"></i>
            Games
          </p>
          <span className="dashboard-stat-user blue">{ totalGames }</span>
          <span className="dashboard-stat-average">{ averageGames } average</span>
        </div>
        <div className="dashboard-stat dashboard-stat-green">
          <p className="dashboard-stat-title">
            <i class="fas fa-trophy"></i>
            Achievements
          </p>
          <span className="dashboard-stat-user green">{ totalAchievements }</span>
          <span className="dashboard-stat-average">{ averageAchievements } average</span>
        </div>
        <div className="dashboard-stat dashboard-stat-red">
          <p className="dashboard-stat-title">
            <i class="fas fa-check-double"></i>
            Completion
          </p>
          <span className="dashboard-stat-user red">{ percentageAchievementsCompleted }%</span>
          <span className="dashboard-stat-average">overall achievements</span>
        </div>
      </section>
    </> : null
  }
}

export default Profile