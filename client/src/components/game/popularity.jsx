import React from "react";
import { Bar } from "react-chartjs-2";

const Popularity = ({games}) => {
  const labels = games.map(game => {
    return game.name
  })
  const popularities =  games.map(game => {
    return game.popularity
  })
  const data = {
    labels: labels,
    
    datasets: [{
      label: "",
      backgroundColor: '#184328',
      borderWidth: 1,
      data: popularities
    }]
  };



  return (
    <div>
      <h1>Popularity</h1>
      <Bar 
        type={'bar'} 
        data={data} 
        width={100} 
        height={50} 
        legend={{display: false}}
        labelling={{display: false}}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return ''
                }
              }
            }]
          },
          maintainAspectRatio: false,
        }} />
    </div>
  )
}


export default Popularity;
