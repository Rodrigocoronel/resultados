import React , {Component} from 'react';

//import * as actions from '../../actions/secciones.js'

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer, Bar, BarChart, TriangleBar, Line , LineChart
} from 'recharts';

const datas = [
	{pan : 33.3 , pri : 17.8 , morena : 35.6  , otros : 10 , label : 'Partidos'},
];

const data = [
      {name: '3pm', pri: 0, pan: 0 ,},
      {name: '4pm', pri: 500, pan: 1398, amt: 2210},
      {name: '5pm', pri: 2000, pan: 9800, amt: 2290},
      {name: '6pm', pri: 2780, pan: 3908, amt: 2000},
];


export default class GraficaGeneral extends Component{

	constructor(props){
		super(props);
		this.state = {

		}
	}
	

	render(){
		return(
		    <div style={{width: '100%', height: '100vh' , paddingTop : '40px', paddingLeft: '10px'}}>
        	<div >
    		<strong></strong>
		        <LineChart  data={data} width={650}  height={400}
	           	 	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			      	<XAxis dataKey="name"/>
			      	<YAxis/>
			      	<CartesianGrid strokeDasharray="3 3"/>
			      	<Tooltip/>
			      	<Legend />
			      	<Line type="monotone" dataKey="pri" stroke="#8884d8" activeDot={{r: 8}}/>
			      	<Line type="monotone" dataKey="pan" stroke="#82ca9d" />
			    </LineChart>
				</div>
			</div>   
		)
	}

}