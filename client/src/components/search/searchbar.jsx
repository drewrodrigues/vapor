import React from 'react';

import Autosuggest from 'react-autosuggest';
import '../../stylesheets/searchbar.scss';
import steamGames from '../../data/data.json';
import steamSpy from '../../data/steamspy.json'

const getSuggestions = value => {
    steamGames = steamGames.applist.apps.app;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if(inputLength === 0) {
        return []
    } else {
        return steamGames
            .filter(game => steamSpy[game.appid])
            .filter(game => game.name.toLowerCase().includes(inputValue))
            .slice(0,50)
    }
};

const getSuggestionValue = suggestion => {
    return suggestion
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
        if(method === "enter"){
        } else {
            if(typeof newValue === "string"){
                this.setState({
                    value: newValue,
                });
            } else {
                this.setState({
                    value: newValue.name,
                    gameId: newValue.appid
                })
            }
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

window.steamGames = steamGames;
export default Searchbar;