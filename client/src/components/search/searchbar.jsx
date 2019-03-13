import React from 'react';
import { connect } from 'react-redux';

import { getSteamApp, clearGame, getIgdbApp, clearGames,
         getIgdbApps, getScreenshots, clearScreenshots,
         renderScreenshots } from '../../actions/gamesActions';

import Autosuggest from 'react-autosuggest';
import '../../stylesheets/searchbar.scss';
import steamGames from '../../data/data.json';
import steamSpy from '../../data/steamspy.json';

const getSuggestions = value => {
    steamGames = steamGames.applist.apps.app;
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
            this.props.getSteamApp({ gameId: newValue.appid }).then(
                () => this.props.getIgdbApp({ name: newValue.name })
            ).then(
                () => this.props.getIgdbApps({ 
                    gameIds: this.props.activeGame.similar_games
                })
            ).then(
                () => this.props.getScreenshots({
                    gameIds: Object.keys(this.props.similarGames)
                })
            ).then(
                () => {
                    let missingScreenshots = [];
                    const selectedScreenshots = Object.keys(this.props.similarGamesScreenshots);
                    const selectedGames = Object.keys(this.props.similarGames);
                    selectedGames.forEach( gameId => {
                        if (!selectedScreenshots.includes(gameId)) {
                            missingScreenshots = missingScreenshots.concat(gameId);
                        }
                    })
                    if (missingScreenshots.length !== 0) {
                        return this.props.getScreenshots({
                            gameIds: missingScreenshots
                        })
                    }
                }
            ).then(
                () => this.props.renderScreenshots()
            );
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
            placeholder: 'Type a game',
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
        getIgdbApps: gameIds => dispatch(getIgdbApps(gameIds)),
        getScreenshots: gameIds => dispatch(getScreenshots(gameIds)),
        clearGame: () => dispatch(clearGame()),
        clearGames: () => dispatch(clearGames()),
        clearScreenshots: () => dispatch(clearScreenshots()),
        renderScreenshots: () => dispatch(renderScreenshots())
    }
}

window.steamGames = steamGames;
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);