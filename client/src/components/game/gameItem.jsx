import React from 'react';

const GameItem = ({ game }) => {
  const aggregated_rating = game.aggregated_rating || 0;
  const popularity = game.popularity || 0;
  const imageId = game.screenshots[0].image_id;
  debugger;
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

export default GameItem;