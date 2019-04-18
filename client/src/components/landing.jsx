import React from 'react';
import { connect } from 'react-redux';
import Screenshot from './bg_screenshot/screenshot';
import TTB  from '../components/game/ttb'
import GameInfo from '../components/game/gameInfo'
import SimilarGamesRow from './game/similarGamesRow';
import Popularity from './game/popularity';
import Searchbar from './search/searchbar'
import { setLandingLoading } from '../actions/loadingActions';

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.landingJumbo = React.createRef();
    this.searchResult = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.props.loading){
      console.log(this.landingJumbo.current)
      this.landingJumbo.current.style.opacity = '0'
      setTimeout(() => { 
        this.landingJumbo.current.style.maxHeight = '0px';
        this.searchResult.current.style.opacity = '1';
      }, 1000)

      
    }
  }

  handleClick(){
    this.props.setLandingLoading();
    this.landingJumbo.current.style.maxHeight = '300px';
    this.searchResult.current.style.opacity = '0';
    setTimeout(() => { 
      this.landingJumbo.current.style.opacity = '1'
      }, 1000)

  }
  render() {
    const {backgroundFetched, game} = this.props;
    let games = [];
    
    if(game.similar_games){
      games = games.concat(game.similar_games);
    }
  
    
    return (
      <div className="container">
        <section className="landing"> 
          <section className="landing-jumbo" ref={this.landingJumbo}>
            <h2 className="landing-jumbo-subtitle">FIND SICK GAMES</h2>
            <h1 className="landing-jumbo-title">VAPOR</h1>
            <div className="landing-jumbo-searchContainer">
              <i className="fas fa-search"></i>
              <Searchbar />
            </div>
          </section>
        {backgroundFetched ? (
          <div ref={this.searchResult} className='searchResult-container'>
            <header className="searchResult-header">
              <h3 className="searchResult-header-title">{ game.name }</h3>
              <button onClick={this.handleClick} className="searchResult-header-search">Search</button>
            </header>
            <section className="searchResult-body">
              <GameInfo game={game}/>
              {game.igdb_id ?
                <div className="game-vis">
                  <TTB game={game} />
                  <SimilarGamesRow />
                  <Popularity games={games} />
                </div>
                : (<div class="lds-facebook"><div></div><div></div><div></div></div>)}
            </section>
          </div>
            ) : null }
            <Screenshot />
          </section>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.loading.backgroundUrl,
    game: state.entities.game,
    loading: state.ui.loading.landing
  };
};

const mapDispatchToProps = dispatch => (
  {
    setLandingLoading: () => dispatch(setLandingLoading())
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(Landing);
