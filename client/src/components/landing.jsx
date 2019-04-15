import React from 'react';
import { connect } from 'react-redux';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'
import SimilarGamesRow from './game/similarGamesRow';
import Popularity from './game/popularity';
import Searchbar from './search/searchbar'

const Landing = ({ backgroundFetched, game }) => {
  let games = [];
  if(game.similar_games){
    games = games.concat(game.similar_games);
    games.push(game)
  }
  

  return (
    <div className="container">
      <section className="landing"> 
        <section className="landing-jumbo">
          <h2 className="landing-jumbo-subtitle">FIND SICK GAMES</h2>
          <h1 className="landing-jumbo-title">VAPOR</h1>
          <div className="landing-jumbo-searchContainer">
            <i class="fas fa-search"></i>
            <input className="landing-jumbo-searchbar" placeholder="Search a game..." autoFocus/>
          </div>
        </section>
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
    </div>
  )

}

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.background.fetched,
    game: state.entities.game
  };
};

export default connect(mapStateToProps)(Landing);
