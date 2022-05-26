/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../styles/PokeCard.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const PokeCard = ({ id, image, name, type, onElemClick }) => {
	let finalColor;

	if (type.length === 2) {
		finalColor = colorTypeGradients(
			type[0].type.name,
			type[1].type.name,
			type.length
		);
	} else {
		finalColor = colorTypeGradients(
			type[0].type.name,
			type[0].type.name,
			type.length
		);
	}

	return (
		<div
			className='thumbnail-container'
			style={{
				background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
			}}
			onClick={() => onElemClick({ name })}
		>
			<div className='card-header'>
				<div className='poke-number'>#{String(id).padStart(3, '0')}</div>
			</div>
			<div className='image-container'>
				<LazyLoadImage
					alt='image-pokemon'
					height={150}
					src={image}
					visibleByDefault={false}
					delayMethod={'debounce'}
					effect='blur'
					className='img-thumbnail'
				/>
			</div>
			<div className='poke-name'>
				<h3>{name}</h3>
				<div className='poke-type'>
					{type.map((type) => (
						<Tooltip
							TransitionComponent={Zoom}
							key={type.type.name}
							title={type.type.name}
							arrow
						>
							<div className={`poke-type-bg ${type.type.name}`}>
								<img src={`${type.type.name}.png`} alt='poke-type'></img>
							</div>
						</Tooltip>
					))}
				</div>
			</div>
		</div>
	);
};

export default PokeCard;
