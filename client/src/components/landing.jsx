import React from 'react';
import { connect } from 'react-redux';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'
import SimilarGamesRow from './game/similarGamesRow';
import Popularity from './game/popularity';

const Landing = ({ backgroundFetched, game }) => {
  let games = [];
  if(game.similar_games){
    games = games.concat(game.similar_games);
    games.push(game)
  }
  

  return (
    <>
      <section className="landing"> 
      {backgroundFetched ? (
        <>
          <div className="game-title-container">
            <div className="game-title">
              {game.name}
            </div>
          </div>
          <GameInfo game={game}/>
          {game.igdb_id ?
            <div className="game-vis">
              <Popularity games={games} />
              <TTB game={game} />
            </div>
            : null}
          <SimilarGamesRow />
        </>
          ) : null}
          <Screenshot />
        </section>
    </>
  )

}

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.background.fetched,
    game: state.entities.game
  };
};

export default connect(mapStateToProps)(Landing);