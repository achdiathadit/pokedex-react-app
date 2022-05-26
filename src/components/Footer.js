import React, { Component } from 'react';
import '../styles/Footer.css';

export class Footer extends Component {
	render() {
		return (
			<div className='app-footer'>
				<div>
					Built using{' '}
					<a
						href='https://pokeapi.co/'
						target='_blank'
						rel='noopener noreferrer'
					>
						PokéAPI
					</a>
					,{' '}
					<a
						href='https://reactjs.org/'
						target='_blank'
						rel='noopener noreferrer'
					>
						React
					</a>{' '}
					and{' '}
					<a
						href='https://material-ui.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Material-UI
					</a>
					.
				</div>
			</div>
		);
	}
}

export default Footer;
