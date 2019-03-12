import React from 'react';
import { connect } from 'react-redux';
import Searchbar from './search/searchbar';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'
import SimilarGamesRow from './game/similarGamesRow';

const Landing = ({ backgroundFetched, game }) => {
  return (
    <>
      <h2>Landing</h2>
      <Searchbar />
      {backgroundFetched ? (
        <> 
          <Screenshot />
          <GameInfo game={game}/>
          <SimilarGamesRow />
        </>
      ) : null}

      {game.igdb_id ? 
      <TTB game={game}/> 
        : null}

    </>
  )

}

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.backgroundFetched,
    game: state.entities.game
  };
};

export default connect(mapStateToProps)(Landing);