import React from 'react';
import { connect } from 'react-redux';

import { getSteamApp, clearGame, getIgdbApp, clearGames, clearScreenshots,
         renderScreenshots } from '../../actions/gamesActions';

import Autosuggest from 'react-autosuggest';
import '../../stylesheets/searchbar.scss';
import steamGamesJson from '../../data/data.json';
import steamSpy from '../../data/steamspy.json';
import { clearLandingLoading } from '../../actions/loadingActions';

let steamGames = steamGamesJson.applist.apps.app;

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if(inputLength === 0) {
        return [];
    } else {
        return steamGames
            .filter(game => steamSpy[game.appid])
            .filter(game => game.name.toLowerCase().includes(inputValue))
            .sort((a,b) => a.name.length - b.name.length)
            .slice(0,50);
    }
};

const getSuggestionValue = suggestion => {
    return suggestion;
};

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
)

class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            gameId: null,
            suggestions: []
        };
    }
    
    onChange = (event, { newValue, method }) => {
        if(method === "enter" || method === "click"){
            this.setState({ 
                value: newValue.name,
                appid: 10
            });
            this.props.clearGame();
            this.props.clearGames();
            this.props.clearScreenshots();
            this.props.clearLandingLoading();
            this.props.getSteamApp({ gameId: newValue.appid }).then(
                () => {
                    setTimeout(() => { this.props.getIgdbApp({ name: newValue.name }) }, 2000)
                   
                    const url = this.props.activeGame.screenshots[Math.floor(Math.random() * this.props.activeGame.screenshots.length)].path_full;
                    this.props.renderScreenshots(url)

                }
            ).then( () => {
                console.log(this.props.landingJumbo)

                // setTimeout(
                // this.props.clearLandingLoading,
                // 2000
                // )
            })
        } 
        else if (method === "type"){
            this.setState({ value: newValue });
        }
    };

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ value: ""})
    }
    
    onSuggestionsFetchRequested = ({ value }) => {
        let suggestions = getSuggestions(value)
        suggestions = suggestions
        this.setState({
            suggestions: suggestions
        });
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    
    render() {
        const { value, suggestions } = this.state;
        
        const inputProps = {
            placeholder: 'Search a game...',
            value,
            onChange: this.onChange
        }

        return (
            <form onSubmit={this.handleSubmit} className="searchbar">
                <Autosuggest 
                   suggestions={suggestions}
                   onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                   onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   highlightFirstSuggestion={true}
                
                />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeGame: state.entities.game,
        similarGames: state.entities.similarGames,
        similarGamesScreenshots: state.entities.similarGamesScreenshots
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSteamApp: gameId => dispatch(getSteamApp(gameId)),
        getIgdbApp: name => dispatch(getIgdbApp(name)),
        clearGame: () => dispatch(clearGame()),
        clearGames: () => dispatch(clearGames()),
        clearScreenshots: () => dispatch(clearScreenshots()),
        renderScreenshots: (url) => dispatch(renderScreenshots(url)),
        clearLandingLoading: () => dispatch(clearLandingLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
