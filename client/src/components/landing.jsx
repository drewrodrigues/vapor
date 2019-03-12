import React from 'react';
import { connect } from 'react-redux';
import Searchbar from './search/searchbar';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'

const Landing = ({ backgroundBool, game }) => {
  return (
    <>
      <h2>Landing</h2>
      <Searchbar />
      {backgroundBool ?(
        <> 
          <Screenshot />
          <GameInfo game={game}/>
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
    backgroundBool: state.entities.game.screenshots,
    game: state.entities.game
  };
};

export default connect(mapStateToProps)(Landing);