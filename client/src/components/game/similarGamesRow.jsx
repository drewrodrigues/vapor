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
      <div className="similar-games-wrapper">
        <div className="landing-item-title" style={{ marginLeft: "auto", marginRight: "auto"}}>
          <p className="landing-ttb-score-title">Similar Games</p>
          <div className="underlined"></div>
        </div>
        <div className="similar-games-row-container">
          <ul className="similar-games-row">
            {similarGames.sort(popularityCompare).map(game => {
              return <GameItem key={game.id} game={game}/>
            })}
          </ul>
        </div>
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