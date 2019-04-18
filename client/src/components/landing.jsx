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
  }
  

  return (
    <div className="container">
      <section className="landing"> 
        <section className="landing-jumbo">
          <h2 className="landing-jumbo-subtitle">FIND SICK GAMES</h2>
          <h1 className="landing-jumbo-title">VAPOR</h1>
          <div className="landing-jumbo-searchContainer">
            <i className="fas fa-search"></i>
            <Searchbar />
          </div>
        </section>
      {backgroundFetched ? (
        <>
          <header className="searchResult-header">
            <h3 className="searchResult-header-title">{ game.name }</h3>
            <button className="searchResult-header-search">Search</button>
          </header>
          <section className="searchResult-body">
            <GameInfo game={game}/>
            {game.igdb_id ?
              <div className="game-vis">
                <TTB game={game} />
                <SimilarGamesRow />
                <Popularity games={games} />
              </div>
              : null}
          </section>
        </>
          ) : null}
          <Screenshot />
        </section>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.loading.backgroundUrl,
    game: state.entities.game
  };
};

export default connect(mapStateToProps)(Landing);
