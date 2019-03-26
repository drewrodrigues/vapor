import React from 'react';

class GameInfo extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const { aggregated_rating, metacritic, price_overview, recommendations, steam_id, url} = this.props.game
        
        return (
            <ul className="gameInfo">
                
                
                {aggregated_rating ? (<li><a target="_blank" href={url}><div className="igdbScore icon"></div><p>{Math.round(aggregated_rating)}</p></a></li>
                                    ):(
                                    <li><div className="igdbScore none icon"></div><p></p></li>)}
                {metacritic ? (<li><a target="_blank" href={metacritic.url}><div className="metacriticScore icon"></div><p>{metacritic.score}</p></a></li>
                                    ):(
                                    <li><div className="metacriticScore none icon"></div><p></p></li>)}

                {recommendations ? (<li><a target="_blank"href={`https://store.steampowered.com/app/${steam_id}`}><div className="recommendations icon"></div><p>{recommendations.total}</p></a></li>
                                    ):(
                                    <li><div className="recommendations none icon"></div><p></p></li>)}
                <li>
                    <div className="price icon"></div>
                    <p>{price_overview ? price_overview.final_formatted : "Free"}</p>
                </li>
            </ul>
        );
    }
}


export default GameInfo;