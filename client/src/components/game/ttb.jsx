import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class Doughnut extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const COLORS = ['#0088FE', '#00C49F'];
        const data=[{angle: 5}, {angle: 2}]
        const renderLabel = ({ name }) => {
            return (
              name
            );
          };

          const data2 = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
        
        return (
            <Doughnut data={data2}  width={100} height={20}/>
        );
    }
}

export default Doughnut;