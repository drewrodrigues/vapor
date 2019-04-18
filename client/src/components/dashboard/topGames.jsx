import React from 'react'

const TopGames = ({ games }) => (
  games ? <>
      <section className="dashboard-topGames">
        <h2 className="dashboard-subtitle">
          <i class="fas fa-heart"></i>
          Favorite Games
        </h2>
        { games.map(game => (
          <img src={ game.image_url } alt={`${ game.name } icon`} className="dashboard-ownedGame" />
        ))}
    </section>
  </> : null
)

export default TopGames