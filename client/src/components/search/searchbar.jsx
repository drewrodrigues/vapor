import React from 'react';

import Autosuggest from 'react-autosuggest';
import '../../stylesheets/searchbar.scss';
import steamGames from '../../data/data.json';

const getSuggestions = value => {
    steamGames = steamGames.applist.apps.app;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : (steamGames.filter(game => 
        game.name.toLowerCase().slice(0,inputLength) === inputValue
        ).sort((a,b)=>{
            return a.name.length - b.name.length || a.name.localeCompare(b.name);
        }).slice(0,50))
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
    
    onChange = (event, { newValue }) => {
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
    };
    
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
            <div className="searchbar">
                <Autosuggest 
                   suggestions={suggestions}
                   onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                   onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                
                />
            </div>
        );
    }
}

window.steamGames = steamGames;
export default Searchbar;