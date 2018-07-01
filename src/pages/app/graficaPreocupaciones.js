import React , {Component} from 'react';

//import * as actions from '../../actions/secciones.js'

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer, Bar, BarChart, TriangleBar
} from 'recharts';

const data = [
	{seguridad:10,servicios_publicos:10,empleo:20,infrastructura_urbana:10,agua:10,gasolina:20,basura:10,varios:1 , label : 'Preocupaciones'},
];
const datas = [
	{pan : 33.3 , pri : 17.8 , morena : 35.6  , otros : 10 , label : 'Partidos'},
];


export default class GraficaPreocupaciones extends Component{

	constructor(props){
		super(props);
		this.state = {

		}
	}
	

	render(){
		console.log(this.props.data)
		return(
			<div>
	            <div className="small mb-4 card-subtitle"></div>
	            <div style={{width: '100%', height: '280px' , paddingTop : '40px'}}>
	                <ResponsiveContainer>
	                    <BarChart width={730} height={250} data={this.props.data}>
	                      <CartesianGrid strokeDasharray="3 3" />
	                      <XAxis dataKey="label" />
	                      <YAxis />                                  
					 	  <Tooltip/>
	                      <Legend />                            
		                    <Bar dataKey="Por mexico al frente" fill='blue' />
							<Bar dataKey='PRI' fill='red' />
		                    <Bar dataKey="Juntos haremos historia" fill='brown' />
		                    <Bar dataKey='Partido Verde' fill='green' />
		                    <Bar dataKey='Nueva Alianza' fill='purple' />
		                    <Bar dataKey='Nulos' fill='black' />
	                     </BarChart>
	                </ResponsiveContainer>
	            </div>
            </div>
		)
	}

}