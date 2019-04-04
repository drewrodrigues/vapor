import React from 'react'

const TopGames = ({ games }) => (
  games ? <>
      <section className="dashboard-ownedGames">
        <h4 className="dashboard-ownedGames-title">Games Owned</h4>
        { games.map(game => (
          <img src={ game.image_url } alt={`${ game.name } icon`} className="dashboard-ownedGame" />
        ))}
    </section>
  </> : null
)

export default TopGames