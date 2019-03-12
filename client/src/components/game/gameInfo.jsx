import React from 'react';
import { connect } from 'react-redux';

class GameInfo extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const { aggregate, metacritic, price_overview, recommendations, steam_id } = this.props.game
        
        return (
            <ul className="gameInfo">
                
                
                {aggregate ? (<li><div className="igdbScore icon"></div><p>{Math.round(aggregate)}</p></li>
                                    ):(
                                    <li><div className="igdbScore none icon"></div><p></p></li>)}
                {metacritic ? (<li><a href={metacritic.url}><div className="metacriticScore icon"></div><p>{metacritic.score}</p></a></li>
                                    ):(
                                    <li><div className="metacriticScore none icon"></div><p></p></li>)}

                {recommendations ? (<li><a href={`https://store.steampowered.com/app/${steam_id}`}><div className="recommendations icon"></div><p>{recommendations.total}</p></a></li>
                                    ):(
                                    <li><div className="recommendations none icon"></div><p></p></li>)}
                <li>
                    <div className="price">{price_overview.final_formatted}</div>
                </li>
            </ul>
        );
    }
}

const mSP = state => ({
    aggregate: state.entities.game.aggregated_rating,
    metacritic: state.entities.game.metacritic,
    price_overview:  state.entities.game.price_overview,
    recommendations: state.entities.game.recommendations
})
const mDP = dispatch => ({
    
})

export default connect(mSP, mDP)(GameInfo);