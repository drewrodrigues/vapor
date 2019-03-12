import React from 'react';
import { connect } from 'react-redux';
import GameItem from './gameItem';

const SimilarGamesRow = props => {
  return (
    <ul className="similar-games-row">
      {props.similarGames.map(game => {
        return <GameItem key={game.igdb_id} game={game}/>
      })}
    </ul>
  )
};

const mapStateToProps = state => {
  return {
    similarGames: Object.values(state.entities.similarGames)
  };
};

export default connect(mapStateToProps)(SimilarGamesRow);