// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline



import React, {Component} from "react";

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'

import axios from 'axios';
import PropTypes from 'prop-types';

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
import Captura from '@material-ui/icons/Input'
import Recargar from '@material-ui/icons/Autorenew'





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
	button_texto: {
		margin: theme.spacing.unit,
		marginRight:'25px'
	},
	
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

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			puntosMunicipio : [],
			Municipio : 'Ensenada',
			puntos : [],
			periodo : 0,
			periodo_diputados : [],
			periodo_senadores : [],
			distrito : 0,
			search_seccion : '',
			send_seccion : '',
			filtrado : 1,
			promedio_diputados : '',
			promedio_senadores : '',
			tabActive : 0,
			page: '',
			post: '',
			tab: 0,
			anchorEl: null,
			paginas : [],
			publicaciones : [],
			reacciones : [{
				sad: 0,
				like: 0,
				love: 0,
				haha: 0,
				angry: 0,
				wow: 0
			}],
			color: '',
			lat : '',
			long : '',
			zoom : '',
			kmz : 'distritos.kmz',
			circulos:[],
			modal_token:false,
			modal_secciones:false,

		};

		this._handleChangeSelect = this._handleChangeSelect.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggle_seccion = this.toggle_seccion.bind(this);
		this._searchSeccion = this._searchSeccion.bind(this);
		this.myRef = React.createRef();

	}

	componentDidMount() {
		let self=this;

		 // request.get('api/configuracion')
   //      .then(function(response)
   //      {
   //          if(response.status === 200)
   //          {
   //             //self.paginas(response.data.access_token);
   //          }
   //      });

   //  	request.get('api/periodoDiputados')
   //  	.then(function(response){
   //  		if(response.status === 200){
   //  			self.setState({periodo_diputados : response.data});
   //  		}
   //  	});

   //  	request.get('api/periodoSenadores')
   //  	.then(function(response){
   //  		if(response.status === 200){
   //  			self.setState({periodo_senadores : response.data});
    			
   //  			self.props.promedio_senadores(response.data[0].created_at);
   //  		}
   //  	});
   let municipio= this.state.Municipio;

   	request.get('api/puntosDistrito/7')
    	.then(function(response){
    		if(response.status === 200){
    			self.setState({ puntos : response.data});
    		}
    	});
    request.get('api/puntosMunicipio/'+municipio)
    	.then(function(response){
    		if(response.status === 200){
    			self.setState({ puntosMunicipio : response.data});
    		}
    	});


    }

    toggle(evt)
    {
        this.setState({
            modal_token       : !this.state.modal_token,
        });
    }

     toggle_seccion(evt)
    {
        this.setState({
            modal_secciones       : !this.state.modal_secciones, 
        });
    }

	_handleChangeSelect(e) {
		let _self = this;

		if(e.target.name=='Municipio'){
			request.get('api/puntosMunicipio/'+e.target.value)
    		.then(function(response){
    		if(response.status === 200){
    			_self.setState({ puntosMunicipio : response.data});
    		}
    	});
		}

		this.setState({ [e.target.name]: e.target.value });

		

				
	}

	_actualizarDiputados(distrito , periodo){
		this.props.promedio_diputados(distrito , periodo);
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tabActive': v });
	}

	_searchSeccion(evt){
		evt.preventDefault();
		let {search_seccion} = this.state;
		this.setState({send_seccion : search_seccion});
		
	}

	_handleInputChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
	 };

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
		let {tabActive , promedio_diputados , promedio_senadores , distrito} = this.state;
		let {lat , long , zoom , kmz , reacciones,circulos} = this.state;
		let {periodo_diputados, periodo_senadores, filtrado , periodo} = this.state;
		const { tab, auth, anchorEl , paginas , publicaciones} = this.state;
		const open = Boolean(anchorEl);
		
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		let numDistrito = 1;
		let data = this.props.secciones.data;
		let periodoElegido;
		if(data !== null)
			if(distrito > 0)
				numDistrito = distrito
			else
				numDistrito = ''
		else
			numDistrito = '' 

		if(filtrado == 1 && periodo_diputados !== '' )
			periodoElegido = periodo_diputados[periodo];
		else 
			periodoElegido = periodo_senadores[periodo];

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

							window.location.href = '/#/captura';

						}} className={classes.button_texto} aria-label="Delete">
							<Captura /> Captura
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
				            <Tab label="Distrito 7" />
				          </Tabs>
				        </AppBar>
				        {tabActive === 0 && 
				        	<Grid container spacing={8}>	
					        	<Grid item xs={12} sm={5}> 
					        		<Paper style={{height : '100%'}}>
							        	<div style={{paddingLeft : '20px', paddingTop : '30px', display : 'inline-block'}}>
									    	<FormControl className={classes.formControl} style={{paddingRight : '20px'}}>
												<InputLabel htmlFor="name-readonly">Municipio</InputLabel>
									          <Select
									            value={this.state.Municipio}
									            onChange={this._handleChangeSelect}
									            displayEmpty
									            name="Municipio"
									            className={classes.selectEmpty}
									          	>
									            <MenuItem value={'Ensenada'}>Ensenada</MenuItem>
									            <MenuItem value={'Rosarito'}>Rosarito</MenuItem>
									            <MenuItem value={'Tecate'}>Tecate</MenuItem>
									            <MenuItem value={'Mexicali'}>Mexicali</MenuItem>
									          </Select>
									        </FormControl>
									    </div>
									    <div style={{paddingTop : '30px'}}>
									    	<GraficaPreocupaciones data={[this.state.puntosMunicipio]}/>
									    </div>
						        	</Paper>
						        </Grid>
						        <Grid item xs={12} sm={7}>
						        	<Paper >
							        	<div align="center">
							        		<div style={{paddingTop : '20px'}}>
							        			<label>Resultados Distrito 7</label> <IconButton color="inherit" onClick={() => {

							this.componentDidMount();

						}} className={classes.button_texto} aria-label="Delete">
							<Recargar /> 
						</IconButton>
							        		</div>
							        		<GraficaGeneral datos={this.state.puntos}/>
							        	</div>
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
				
				 {
					this.state.modal_token&& 
						<Modal 
							open={this.state.modal_token} 
							toggle={this.toggle}
						/>
				}
				<ModalSeccion 
					open={this.state.modal_secciones} 
					toggle={this.toggle_seccion} 
				/>

				{/*<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Tabs
							value={this.state.tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={this._handleChangeTab}
						>
							<Tab label="Facebook" icon={<FacebookIcon />} />
							<Tab label="Google Analytics" icon={<GoogleIcon />} />
							<Tab label="Land" icon={<TierraIcon />} />
						</Tabs>
						{tab === 0 && <Typography>Item Two</Typography>}
						{tab === 1 && <Typography>Item Two</Typography>}
						{tab === 2 && <Typography>Item Three</Typography>}
					</Paper>
				</Grid>*/}

			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
	secciones : state.secciones
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	actions,
)(AppWithStyles)