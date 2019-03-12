import React from 'react';
import { connect } from 'react-redux';

const GameItem = ({ game, similarGamesScreenshots }) => {
  const aggregated_rating = game.aggregated_rating || 0;
  const popularity = game.popularity || 0;
  debugger;
  const imageId = similarGamesScreenshots[game.igdb_id].image_id;
  return (
    <div className="game-item-wrapper">
      <div className="game-item">
        <img className="similar-game-thumb"
             src={`https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg`} 
             alt={game.name}
        />
        <div className="game-title">{game.name}</div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  debugger;
  return {
    similarGamesScreenshots: state.entities.similarGamesScreenshots
  };
};

export default connect(mapStateToProps)(GameItem);