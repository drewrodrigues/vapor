import React from 'react'

const TopGames = ({ games }) => (
  games ? <>
      <section className="dashboard-topGames">
        <h4 className="dashboard-topGames-title">Top Games</h4>
        { games.map(game => (
          <img src={ game.image_url } alt={`${ game.name } icon`} className="dashboard-ownedGame" />
        ))}
    </section>
  </> : null
)

export default TopGames