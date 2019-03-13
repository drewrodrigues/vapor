import React from 'react';
import { connect } from 'react-redux';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'
import SimilarGamesRow from './game/similarGamesRow';

const Landing = ({ backgroundFetched, game }) => {
  return (
    <>
      {backgroundFetched ? (
        <section className="landing"> 
          <Screenshot />
          <GameInfo game={game}/>
          <SimilarGamesRow />
          {game.igdb_id ?
            <TTB game={game} />
            : null}
        </section>
      ) : null}
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