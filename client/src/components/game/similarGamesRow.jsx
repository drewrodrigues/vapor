import React from 'react';
import { connect } from 'react-redux';
import GameItem from './gameItem';

const SimilarGamesRow = ({ similarGames }) => {
  const popularityCompare = (gameA, gameB) =>{
    if(gameA.popularity > gameB.popularity) return -1;
    if(gameA.popularity < gameB.popularity) return 1;
    return 0;
  }
  return (
    similarGames ? (
      <div className="similar-games-row-container">
        <div className="similar-games-title">Similar Games</div>
        <ul className="similar-games-row">
          {similarGames.sort(popularityCompare).map(game => {
            return <GameItem key={game.id} game={game}/>
          })}
        </ul>
      </div>
    ) : (
      null
    )
  )
};

const mapStateToProps = state => {
  return {
    similarGames: state.entities.game.similar_games
  };
};

export default connect(mapStateToProps)(SimilarGamesRow);