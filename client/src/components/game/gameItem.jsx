import React from 'react';
import VaporIcon from '../../assets/vapor_icon.svg';

const GameItem = ({ game }) => {
  const aggregated_rating = game.aggregated_rating || 0;
  const popularity = game.popularity || 0;
  const imageId =  game.screenshots ? game.screenshots[0].image_id : 0;
  const url = imageId ? `https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg` : VaporIcon
  
  return (
    <div className="game-item-wrapper">
      <a target="_blank" href={`${game.url}`}>
        <div className="game-item">
          <img className="similar-game-thumb"
              src={url} 
              alt={game.name}
          />
          <div className="game-title" >{game.name}</div>
        </div>
      </a>
    </div>
  )
};

export default GameItem;