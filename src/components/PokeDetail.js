/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import '../styles/PokeDetail.css';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const fetchGenderRate = (genderRate) => {
	switch (genderRate) {
		case 0:
			return (
				<div className='gender'>
					<span>
						100% <MaleIcon />
					</span>
					<span>
						{' '}
						0% <FemaleIcon />
					</span>
				</div>
			);
		case 1:
			return (
				<div className='gender'>
					<span>
						87.5% <MaleIcon />
					</span>
					<span>
						{' '}
						12.5% <FemaleIcon />
					</span>
				</div>
			);
		case 2:
			return (
				<div className='gender'>
					<span>
						75% <MaleIcon />
					</span>
					<span>
						{' '}
						25% <FemaleIcon />
					</span>
				</div>
			);
		case 3:
			return (
				<div className='gender'>
					<span>
						62.5% <MaleIcon />
					</span>
					<span>
						{' '}
						37.5% <FemaleIcon />
					</span>
				</div>
			);
		case 4:
			return (
				<div className='gender'>
					<span>
						50% <MaleIcon />
					</span>
					<span>
						{' '}
						50% <FemaleIcon />
					</span>
				</div>
			);
		case 5:
			return (
				<div className='gender'>
					<span>
						37.5% <MaleIcon />
					</span>
					<span>
						{' '}
						62.5% <FemaleIcon />
					</span>
				</div>
			);
		case 6:
			return (
				<div className='gender'>
					<span>
						25% <MaleIcon />
					</span>
					<span>
						{' '}
						75% <FemaleIcon />
					</span>
				</div>
			);
		case 7:
			return (
				<div className='gender'>
					<span>
						12.5% <MaleIcon />
					</span>
					<span>
						{' '}
						87.5% <FemaleIcon />
					</span>
				</div>
			);
		case 8:
			return (
				<div className='gender'>
					<span>
						0% <MaleIcon />
					</span>
					<span>
						{' '}
						100% <FemaleIcon />
					</span>
				</div>
			);
		default:
			return <span>Loading...</span>;
	}
};

const PokeDetail = (props) => {
	let finalColor;

	if (props.category.length === 2) {
		finalColor = colorTypeGradients(
			props.category[0].type.name,
			props.category[1].type.name,
			props.category.length
		);
	} else {
		finalColor = colorTypeGradients(
			props.category[0].type.name,
			props.category[0].type.name,
			props.category.length
		);
	}

	return (
		<div>
			<Dialog
				aria-labelledby='customized-dialog-title'
				open={props.open}
				onBackdropClick={props.cancel}
				fullWidth
				maxWidth='md'
			>
				<DialogContent
					style={{
						background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
					}}
					className='dialog-content'
				>
					<div className='info-container'>
						<div className='info-container-img'>
							<div className='pokemon-id'>
								#{String(props.number).padStart(3, '0')}
							</div>
							<div className='pokemon-name'>{props.name}</div>
							<div
								className='pokemon-genera'
								style={{ background: finalColor[0] }}
							>
								{props.genera}
							</div>
							<div>
								<img src={props.img} alt='poke-img' />
							</div>
							<div className='info-container-data-type'>
								{props.category.map((category) => (
									<Tooltip
										TransitionComponent={Zoom}
										key={category.type.name}
										title={category.type.name}
										arrow
									>
										<div
											key={category.type.name}
											className={`poke-type-bg ${category.type.name}`}
										>
											<img
												src={`${category.type.name}.png`}
												alt='poke-type'
											></img>
										</div>
									</Tooltip>
								))}
							</div>
							<div className='dimensions'>
								<p>
									<span className='info-container-headings'>Height</span>
									<br></br>
									<span>
										{`${props.height / 10} m/${`${Math.floor(
											(props.height / 10) * 3.28
										)}'${Math.round(
											(((props.height / 10) * 3.28) % 1) * 12
										)}"`} `}{' '}
									</span>
								</p>
								<p>
									<span className='info-container-headings'>Weight</span>
									<br></br>
									<span>
										{` ${(props.weight / 10).toFixed(1)} kg/${(
											props.weight * 0.2205
										).toFixed(1)} lbs`}
									</span>
								</p>
							</div>
							<div className='gender-container'>
								{props.genderRate === -1
									? 'Genderless'
									: fetchGenderRate(props.genderRate)}
							</div>
						</div>
						<div className='right-box'>
							<div>
								<div className='info-container-headings'>About</div>
								<div className='desc'>{props.description}</div>
							</div>
							<div className='info-container-headings'>Abilities</div>
							<div className='ability-list-bg'>
								<ul className='ability-list'>
									{props.abilities.map((ability) => (
										<li key={ability}>
											<div className='ability'>{ability}&nbsp;</div>
										</li>
									))}
								</ul>
							</div>
							<div>
								<div className='info-container-headings'>Base Stats</div>
								<div className='info-container-stat'>
									{props.stats.map((stat) => (
										<div
											key={stat['stat-name']}
											className='info-container-stat-columns'
										>
											<div className='info-container-stat-columns-name'>
												{stat['stat-name']}
											</div>
											<div className='info-container-stat-columns-val'>
												{stat['stat-val']}
											</div>
										</div>
									))}
								</div>
							</div>
							<div>
								<div className='info-container-headings'>Evolution</div>
								<div className='evolution-box'>
									{props.evoChain.map((value, index, elements) => (
										<div className='evolution-sub-box'>
											<div>
												<div className='evolution-img-div'>
													<div className='transparency-div'>
														<LazyLoadImage
															alt='image-pokemon'
															height={80}
															width={80}
															src={elements[index].image_url}
															visibleByDefault={false}
															delayMethod={'debounce'}
															effect='blur'
															className='evo_img'
															onClick={() =>
																props.evolutionPokemon(
																	props.number,
																	elements[index].species_name,
																	props.category,
																	elements[index].image_url
																)
															}
														/>
													</div>
												</div>
												<div className='evolution-poke-name'>
													{elements[index].species_name}
												</div>
											</div>
											{elements[index + 1] && (
												<DoubleArrowIcon className='arrow-right'></DoubleArrowIcon>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default PokeDetail;
