import React from "react";
import { Bar } from "react-chartjs-2";
import PopularityGraph from "./popularity_graph";
import VaporIcon from '../../assets/vapor_icon.svg';


const Popularity = ({games}) => {
  const labels = games.map(game => {
    return game.name
  })
  const data =  games.map(game => {
    const imageId =  game.screenshots ? game.screenshots[0].image_id : 0;
    return ({
      popularity: Math.round(game.popularity),
      name: game.name,
      url: imageId ? `https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg` : VaporIcon
    })
  })
  return (
    <div className="popularity-wrapper">
      <div className="landing-item-title">
        <p>Similar Games Popularity</p>
        <div className="underlined"></div>
      </div>
      <PopularityGraph data={data} />
    </div>
  )
}


export default Popularity;
