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

		let {datos} = this.props;
		console.log(datos)
		return(
		    <div style={{width: '100%', height: '100vh' , paddingTop : '40px', paddingLeft: '10px'}}>
        	<div >
    		<strong></strong>
		        <LineChart  data={datos} width={800}  height={400}
	           	 	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			      	<XAxis dataKey="name"/>
			      	<YAxis/>
			      	<CartesianGrid strokeDasharray="3 3"/>
			      	<Tooltip/>
			      	<Legend />
			      	
			      	<Line type="monotone" dataKey="Por mexico al frente" 		stroke="#3333d6" activeDot={{r: 8}}/>

			      	<Line type="monotone" dataKey="PRI" 		stroke="#db0d21" />

			      	<Line type="monotone" dataKey="Juntos haremos historia" stroke="#7c7273" />


			      	<Line type="monotone" dataKey="Partido Verde" 			stroke="#21a812" />
			      	<Line type="monotone" dataKey="Nueva Alianza" 			stroke="#299e90" />
			      	<Line type="monotone" dataKey="Nulos" 		stroke="#000000" />
			    </LineChart>
				</div>
			</div>   
		)
	}

}