import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {Doughnut} from 'react-chartjs-2';

class Searchbar extends React.Component{
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
            // <PieChart width={300} height={300} >
            //     <Pie 
            //         data={[{"name": "Price","value": 60},{"name":"TTB", "value": 10}]} 
            //         dataKey="value" 
            //         nameKey="name" 
            //         cx="50%" 
            //         cy="50%" 
            //         innerRadius={50} 
            //         outerRadius={100}
            //         label={renderLabel}
            //         strokeColor="#fffff"
            //     >
            //     {
                
            //     data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            //     }
            //     </Pie>
            // </PieChart>


            <Doughnut data={data2}  width={100} height={20}/>
        );
    }
}

export default Searchbar;