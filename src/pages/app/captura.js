// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline

import React, {Component} from "react";

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'

import axios from 'axios';
import PropTypes from 'prop-types';

import swal from 'sweetalert2';

import {
	Grid,
	Paper,
	AppBar, Toolbar, Typography,
	IconButton, Icon, Button,
	FormControl, InputLabel, Select, MenuItem,
	FormHelperText, Input,
	Tabs, Tab,
	Menu, List , ListItem ,Avatar,ListItemText, TextField
} from '@material-ui/core/';

/* Iconos */
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TierraIcon from '@material-ui/icons/PinDrop';
import GoogleIcon from '@material-ui/icons/Equalizer';
import FacebookIcon from '@material-ui/icons/Share';
import Token from '@material-ui/icons/CardMembership';
import Cicle from '@material-ui/icons/Brightness1'



/* Images */
import Sad from './images/sad.png';
import Wow from './images/wow.png';
import Angry from './images/angry.png';
import Like from './images/like.png';
import Haha from './images/haha.png';
import Love from './images/love.png';
import Nimblin from './images/nimblin.jpeg';

import { withStyles } from '@material-ui/core/styles';

import './index.css';

/* Mapa */
import Maps from '../../components/googleMaps';

import * as actions from '../../actions/secciones.js';
import {api,request} from '../../actions/request';
/* Modales */
import Modal from "../../components/token/modal";
import ModalSeccion from "../../components/secciones/modal";

/* gracias */
import GraficaGeneral from './graficaGeneral';
import GraficaPersepcion from './graficaPersepcion';
import GraficaPreocupaciones from './graficaPreocupaciones';

const styles = theme => ({
	root: {
		flexGrow: 1,
		paddingTop: 64,
	},
	flex: {
		flex: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
	titulo : {
		color: '#666666',
		 fontSize: '150%',
		
	},
	subtitulo : {
	color: '#666666',
	
	}
	
});

const styling = {
	pri : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(197,121,128)'
	},
	pan : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(112,121,255)'
	},
	morena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(197,163,128)'
	},
	panMorena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(239,248,128)'
	},
	priMorena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: 'rgb(112,121,128)'
	},
	priPan : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: 'rgb(197,121,255)'
	},
	otro : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: '#005500'
	}

}


const D3 = [
	{has: '#ensenada54', lat: 31.8664105,lng:-116.6111767},
	{has: '#ensenada93',lat: 31.855366, lng: -116.584063},	
	{has: '#ensenada114',lat: 31.832876, lng: -116.597712},	
];

class Captura extends Component {

	constructor(props) {
		super(props)

		this.state = {
			anchorEl: null,
				tabActive : 0,
				casilla:{
					nombre_rc:"",
					seccion:'',
					telefono:'',
					tipo_casilla:'',
					prd :'',
					pan :'',
					mc :'',
					prd_pan:'',
					pan_mc:'',
					prd_mc:'',
					pri:'',
					morena:'',
					pt :'',
					pes :'',
					morena_pt:'', 
					morena_pes :'',
					pt_pes :'',
					pv :'',
					na :'',
					nulos:''
								}

		};

		this._handleChangeTab = this._handleChangeTab.bind(this);
	this.submit 				= this.submit.bind(this);
	this.handleChangeInput 		= this.handleChangeInput.bind(this);
		this.myRef = React.createRef();

	}

	componentDidMount() {
		


    }

   

	submit() {
let {casilla} = this.state;
console.log("casilla----->",casilla);
let save=true;


let check = [       'nombre_rc',
					'seccion',
					'telefono',
					'tipo_casilla',
					'prd',
					'pan',
					'mc',
					'prd_pan',
					'pan_mc',
					'prd_mc',
					'pri',
					'morena',
					'pt',
					'pes',
					'morena_pt',
					'morena_pes',
					'pt_pes',
					'pv',
					'na',
					'nulos',
					];
					let campo='';
           for(let i in check) {

			let key = check[i];

			let value = casilla[key];

			if(value == '' || value == null){
				save = false;
				console.log(key);

			}
                 
                

			
				
			}

		

		if(save){
			request.post('api/casillas', casilla).then(function(response) {

			if(response.status === 200) {

               /*exito*/
				
                 swal("Registro", "Exitoso ");
				

			}
			else{
			swal("Oops..", "Error de registro ");
			}

		})
		.catch(function(error) {
			swal("Oops..", "Error de Servidor ");
			// dispatch({ type: 'SAVE_FAILURE' });
		});


		}else{
         swal("Oops..", "Llenar todos los campos( "+campo+") ");
		}

       
	}

	_actualizarDiputados(distrito , periodo){
		this.props.promedio_diputados(distrito , periodo);
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tabActive': v });
	}



	

	 handleChangeInput(event)
	{
		const target 	= event.target;
		const value 	= target.type === 'checkbox' ? target.checked : target.value;
		const name 		= target.name;

		let {casilla} = this.state;
		casilla[name] = value;
		this.setState({casilla: casilla});
  

	}

	_handleAccountMenu(event) {
		this.setState({ anchorEl: event.currentTarget });
	};

	_handleCloseAccountMenu(event) {
		this.setState({ anchorEl: null });
	};

	_handleAccountMenuItem(evt, index) {
		
		// if(index === 0) {
		// 	makesomething
		// }
		// else if (index === 1) {
		// 	makesomething
		// }
		if(index === 2){
			this.props.sigout();
		}

		// close
		this.setState({ anchorEl: null });

	}

	render() {
		
		const { classes } = this.props;
		let {tabActive,casilla } = this.state;
	
		const {  anchorEl } = this.state;
		const open = Boolean(anchorEl);
		
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		

		if(!this.props.auth.authenticated)
			return <Redirect to={from} />;

		return(

			<Grid container className={classes.root} spacing={8} >
				<AppBar >
					<Toolbar >
						<Typography variant="title" color='inherit' className={classes.flex}>
							Nimblin
						</Typography>
						<IconButton color="inherit" onClick={() => {

							window.location.href = 'http://encuestasbc.org/verify/#/app';

						}} className={classes.button} aria-label="Delete">
							<DashboardIcon />
						</IconButton>
						
						<IconButton
							color="inherit"
							className={classes.button}
							aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this._handleAccountMenu.bind(this)}
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{vertical: 'top',horizontal: 'right',}}
							transformOrigin={{vertical: 'top', horizontal: 'right',}}
							open={open}
							onClose={this._handleCloseAccountMenu.bind(this)}
						>
							{
								["Profile", "Account","Log Out"].map((option, index) => (
									<MenuItem
										key={index}
										onClick={event => this._handleAccountMenuItem(event, index)}
									>
										{option}
									</MenuItem>
								))
							}
						</Menu>
					</Toolbar>
				</AppBar>

				<Grid item xs={12}>
					<Paper>
						<AppBar position="static">
				          <Tabs value={tabActive} style={{background : '#202F38'}}onChange={this._handleChangeTab}>
				            <Tab label="Captura de Casilla" />
				          </Tabs>
				        </AppBar>
				        {tabActive === 0 && 
				        	<Grid container spacing={8}>	
					        	<Grid item xs={12} sm={12}> 
					        		<Paper>
							        	<div align="center" style={{paddingTop: '10px' , paddingBottom : '10px'}} >
							        		<strong><label className={classes.titulo}>Reporte de Captura Distrito 7: </label></strong>
							        		<br/>	<br/>
							        		<label className={classes.subtitulo}>- Elecciones 2018 -</label>
							        		
							        	</div>
						        	</Paper>
						        	<Paper>
							        	<div  style={{paddingTop: '10px' , paddingBottom : '10px',marginLeft:'100px'}} >
							        		<strong><label className={classes.titulo}>Datos Representante: </label></strong>
							        	</div>
							        		<br/>
							        	<div  style={{paddingTop: '10px' , paddingBottom : '10px' ,marginLeft:'250px'}} >
							        		
							        	
							        		<label>Nombre Completo: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '300px' }}
							        			name='nombre_rc'
							        			onChange={this.handleChangeInput}
							        			value={casilla.nombre_rc}
							        		
							        		/>
							        		<label  style={{ marginLeft:'50px' }}>Telefono: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '300px' }}
							        			name='telefono'
							        			onChange={this.handleChangeInput}
							        			value={casilla.telefono}
							        		
							        		/>

							        
							        		
							        	</div>
						        	</Paper>
						        	<Paper>
							        	<div  style={{paddingTop: '10px' , paddingBottom : '10px',marginLeft:'100px'}} >
							        		<strong><label className={classes.titulo}>Datos de la Casilla: </label></strong>
							        	</div>
							        		<br/>
							        	<div  style={{paddingTop: '10px' , paddingBottom : '10px' ,marginLeft:'250px'}} >
							        		
							        	
							        		<label>Seccion: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '85px' }}
							        			name='seccion'
							        			onChange={this.handleChangeInput}
							        			value={casilla.seccion}
							        		
							        		/>
							        		<label  style={{ marginLeft:'50px' }}>Tipo Casilla: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '300px' }}
							        			name='tipo_casilla'
							        			onChange={this.handleChangeInput}
							        			value={casilla.tipo_casilla}
							        		
							        		/>

							        
							        		
							        	</div>
						        	</Paper>
						        	<Paper>
							        	<div  style={{paddingTop: '10px' , paddingBottom : '10px',marginLeft:'100px'}} >
							        		<strong><label className={classes.titulo}>Votos de la Casilla: </label></strong>
							        	</div>
							        		<br/>
										<Grid container  spacing={8}>	
											<Grid item xs={12} sm={12}>
											<Paper>
											<label  style={{ marginLeft:'50px' }}>PAN: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pan'
							        			onChange={this.handleChangeInput}
							        			value={this.state.casilla.pan}
							        		
							        		/> 
							        	
							        		<label  style={{ marginLeft:'50px' }}>PAN-PRD: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='prd_pan'
							        			onChange={this.handleChangeInput}
							        			value={casilla.prd_pan}
							        		
							        		/>
							        		
							        		<label  style={{ marginLeft:'50px' }}>PAN-Movimiento C.: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pan_mc'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pan_mc}
							        		
							        		/>
							        	
							        		<label  style={{ marginLeft:'50px' }}>PRD: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='prd'
							        			onChange={this.handleChangeInput}
							        			value={casilla.prd}
							        		
							        		/>
							        	
							        		<label  style={{ marginLeft:'50px' }}>PRD-Movimiento C: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='prd_mc'
							        			onChange={this.handleChangeInput}
							        			value={casilla.prd_mc}
							        		
							        		/>
							        	
							        		<label  style={{ marginLeft:'50px' }}>Movimiento Ciudadano: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='mc'
							        			onChange={this.handleChangeInput}
							        			value={casilla.mc}
							        		
							        		/>
							        			<br/><br/>
		                                    </Paper>
								        	
											</Grid>






											<Grid item xs={12} sm={12}> 
                                             <Paper>
											<label  style={{ marginLeft:'50px' }}>PRI: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pri'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pri}
							        		
							        		/>


							        		<label  style={{ marginLeft:'50px' }}>Nueva Alianza: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='na'
							        			onChange={this.handleChangeInput}
							        			value={casilla.na}
							        		
							        		/>

							        		<label  style={{ marginLeft:'50px' }}>Partido Verde: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pv'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pv}
							        		
							        		/>
											<br/><br/>
											</Paper>
								        	
											</Grid>






											<Grid item xs={12} sm={12}> 
                                             <Paper>
											<label  style={{ marginLeft:'50px' }}>Morena: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='morena'
							        			onChange={this.handleChangeInput}
							        			value={casilla.morena}
							        		
							        		/>
							        		
							        		<label  style={{ marginLeft:'50px' }}>Morena-PT: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='morena_pt'
							        			onChange={this.handleChangeInput}
							        			value={casilla.morena_pt}
							        		
							        		/>
							        	
							        		<label  style={{ marginLeft:'50px' }}>Morena-P. Encuentro S.: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='morena_pes'
							        			onChange={this.handleChangeInput}
							        			value={casilla.morena_pes}
							        		
							        		/>

							        		<label  style={{ marginLeft:'50px' }}>Partido del Trabajo: </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pt'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pt}
							        		
							        		/>

							        		<label  style={{ marginLeft:'50px' }}>PT -P. Encuentro S. : </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pt_pes'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pt_pes}
							        		
							        		/>
							        		<br/><br/>
							        		<label  style={{ marginLeft:'50px' }}>P. Encuentro Social : </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='pes'
							        			onChange={this.handleChangeInput}
							        			value={casilla.pes}
							        		
							        		/>
							        		<label  style={{ marginLeft:'50px' }}>Votos  nulos : </label>
							        		<Input
							        			type='text'							        			
							        		    style={{width: '45px' }}
							        			name='nulos'
							        			onChange={this.handleChangeInput}
							        			value={casilla.nulos}
							        		
							        		/>


							        	<br/><br/>
                                          </Paper>
											</Grid>
											
										</Grid>
										 <Button color="primary" type="submit" style={{ float:'right' }} onClick={this.submit}   >
                                 &nbsp;Guardar
                                 </Button>{' '}
                                 <br/><br/>
                                 <br/><br/>
                                 <br/><br/>

						        	</Paper>
								


						        </Grid>
					        </Grid>
				        }
				        {tabActive === 1 && 
				        	<div>tab2</div>
				        }
				        {tabActive === 2 && 
				        	<div>tab3</div>
				        }
					</Paper>
				</Grid>
				
				

			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(Captura);

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
	secciones : state.secciones
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	actions,
)(AppWithStyles)