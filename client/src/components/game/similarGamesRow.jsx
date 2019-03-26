import React from 'react';
import { connect } from 'react-redux';
import GameItem from './gameItem';

const SimilarGamesRow = props => {
  return (
    <div className="similar-games-row-container">
      <div className="similar-games-title">Similar Games</div>
      <ul className="similar-games-row">
        {props.similarGames.map(game => {
          return <GameItem key={game.igdb_id} game={game}/>
        })}
      </ul>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    similarGames: Object.values(state.entities.similarGames)
  };
};

export default connect(mapStateToProps)(SimilarGamesRow);