/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import Header from './components/Header';
import PokeCard from './components/PokeCard';
import PokeDetail from './components/PokeDetail';
import { motion } from 'framer-motion';
import './index.css';

const list = {
	visible: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.35,
			delayChildren: 0.75,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			when: 'afterChildren',
		},
	},
};

const items = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 0, x: -150 },
};

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allPokemons: [],
			searchPokemons: [],
			filterPokemons: [],
			evoChain: [],
			abilities: '',
			height: '',
			weight: '',
			category: '',
			stats: [],
			imageURL: '',
			pokeName: '',
			pokeNumber: '',
			genderRate: '',
			genera: '',
			isTypeSelected: false,
			selectedType: '',
			showInfo: false,
			isSearch: false,
			searchString: '',
			description: '',
			showLoading: true,
			isFilter: false,
			noDataFound: false,
			limit: 151,
			offset: 0,
			isChecked: false,
			evolID: '',
			evolName: '',
			evolTypes: [],
			evolImgURL: '',
			regions: [
				{
					name: 'Kanto',
					limit: 151,
					offset: 0,
				},
				{
					name: 'Johto',
					limit: 100,
					offset: 151,
				},
				{
					name: 'Hoenn',
					limit: 135,
					offset: 251,
				},
				{
					name: 'Sinnoh',
					limit: 108,
					offset: 386,
				},
				{
					name: 'Unova',
					limit: 155,
					offset: 494,
				},
				{
					name: 'Kalos',
					limit: 72,
					offset: 649,
				},
				{
					name: 'Alola',
					limit: 88,
					offset: 721,
				},
				{
					name: 'Galar',
					limit: 89,
					offset: 809,
				},
			],
			types: [
				'all types',
				'grass',
				'bug',
				'dark',
				'dragon',
				'electric',
				'fairy',
				'fighting',
				'fire',
				'flying',
				'ghost',
				'ground',
				'ice',
				'normal',
				'poison',
				'psychic',
				'rock',
				'steel',
				'water',
			],
			sortBy: ['ID', 'Name'],
		};
	}

	componentDidMount() {
		const { offset, limit } = this.state;
		this.getAllPokemons(offset, limit);
	}

	getAllPokemons = async (offset, limit) => {
		const response = await axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
			.catch((err) => console.log('Error:', err));
		this.getPokemonData(response.data.results);
	};

	getPokemonData = async (result) => {
		const { isTypeSelected, selectedType } = this.state;
		const pokemonArr = [],
			filterArr = [];

		await Promise.all(
			result.map((pokemonItem) => {
				return axios
					.get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
					.then((result) => {
						pokemonArr.push(result.data);
					});
			})
		);

		pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

		if (isTypeSelected) {
			for (let i = 0; i < pokemonArr.length; i++) {
				for (let j = 0; j < pokemonArr[i].types.length; j++) {
					if (selectedType === pokemonArr[i].types[j].type.name) {
						filterArr.push(pokemonArr[i]);
					}
				}
			}
			this.setState({
				isFilter: true,
				filterPokemons: filterArr,
				allPokemons: pokemonArr,
				showLoading: false,
			});
		} else {
			this.setState({
				isFilter: false,
				allPokemons: pokemonArr,
				showLoading: false,
			});
		}
	};

	handleChangeRegion = (event) => {
		const { regions } = this.state;
		for (let i = 0; i < regions.length; i++) {
			if (regions[i].name === event.target.value) {
				this.setState({
					regionValue: event.target.value,
					sortType: 'ID',
					isSearch: false,
					isFilter: false,
					showLoading: true,
				});

				this.getAllPokemons(regions[i].offset, regions[i].limit);

				break;
			}
		}
	};

	handleChangeType = (event) => {
		const { allPokemons, sortType } = this.state;
		if (event.target.value === 'all types') {
			const allPoks = allPokemons;
			if (sortType === 'Name') {
				allPoks.sort((a, b) =>
					a.name > b.name ? 1 : b.name > a.name ? -1 : 0
				);
				this.setState({
					isFilter: false,
					typeValue: event.target.value,
					allPokemons: allPoks,
					isTypeSelected: false,
				});
			} else {
				allPoks.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
				this.setState({
					isFilter: false,
					typeValue: event.target.value,
					allPokemons: allPoks,
					isTypeSelected: false,
				});
			}
			return;
		} else {
			this.setState({
				isTypeSelected: true,
				selectedType: event.target.value,
			});
		}

		let filterArr = [];

		for (let i = 0; i < allPokemons.length; i++) {
			for (let j = 0; j < allPokemons[i].types.length; j++) {
				if (event.target.value === allPokemons[i].types[j].type.name) {
					filterArr.push(allPokemons[i]);
				}
			}
		}

		sortType === 'Name'
			? filterArr.sort((a, b) =>
					a.name > b.name ? 1 : b.name > a.name ? -1 : 0
			  )
			: filterArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

		this.setState({
			isSearch: false,
			searchValue: '',
			isFilter: true,
			filterPokemons: filterArr,
			typeValue: event.target.value,
		});

		filterArr.length === 0
			? this.setState({ noDataFound: true })
			: this.setState({ noDataFound: false });
	};

	handleChangeSort = (event) => {
		const { filterPokemons, allPokemons, isFilter } = this.state;
		let sortArr;

		isFilter ? (sortArr = filterPokemons) : (sortArr = allPokemons);

		if (event.target.value === 'ID') {
			sortArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
		} else {
			sortArr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
		}

		isFilter
			? this.setState({
					filterPokemons: sortArr,
					sortType: event.target.value,
			  })
			: this.setState({
					allPokemons: sortArr,
					sortType: event.target.value,
			  });
	};

	render() {
		console.log('state: ', this.state);
		const {
			regionValue,
			regions,
			typeValue,
			types,
			sortBy,
			sortType,
			filterPokemons,
			searchPokemons,
			allPokemons,
			isSearch,
			isFilter,
		} = this.state;
		return (
			<div className='app-container'>
				<PokeDetail />
				<Header />
				<FilterBar
					regionValue={regionValue}
					regionSelect={this.handleChangeRegion}
					regions={regions}
					typeValue={typeValue}
					typeSelect={this.handleChangeType}
					types={types}
					sortBy={sortBy}
					sortType={sortType}
					sortSelect={this.handleChangeSort}
				/>
				<div className='pokemon-container'>
					<div className='all-pokemons'>
						{isSearch ? (
							Object.keys(searchPokemons).map((item) => (
								<PokeCard
									key={searchPokemons[item].id}
									id={searchPokemons[item].id}
									image={
										searchPokemons[item].sprites.other.dream_world.front_default
											? searchPokemons[item].sprites.other.dream_world
													.front_default
											: searchPokemons[item].sprites.other['official-artwork']
													.front_default
									}
									name={searchPokemons[item].name}
									type={searchPokemons[item].types}
									onElemClick={() =>
										this.fetchPokemonData(
											searchPokemons[item].id,
											searchPokemons[item].name,
											searchPokemons[item].types,
											searchPokemons[item].sprites.other.dream_world
												.front_default
												? searchPokemons[item].sprites.other.dream_world
														.front_default
												: searchPokemons[item].sprites.other['official-artwork']
														.front_default
										)
									}
								/>
							))
						) : !isFilter ? (
							<motion.ul
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									listStyleType: 'none',
									paddingInlineStart: '0px',
									marginBlockStart: '0px',
									marginBlockEnd: '0px',
									alignItems: 'center',
									justifyContent: 'center',
								}}
								initial='hidden'
								animate='visible'
								variants={list}
							>
								{Object.keys(allPokemons).map((item) => (
									<motion.li variants={items}>
										<PokeCard
											key={allPokemons[item].id}
											id={allPokemons[item].id}
											image={
												allPokemons[item].sprites.other.dream_world
													.front_default
													? allPokemons[item].sprites.other.dream_world
															.front_default
													: allPokemons[item].sprites.other['official-artwork']
															.front_default
											}
											name={allPokemons[item].name}
											type={allPokemons[item].types}
											onElemClick={() =>
												this.fetchPokemonData(
													allPokemons[item].id,
													allPokemons[item].name,
													allPokemons[item].types,
													allPokemons[item].sprites.other.dream_world
														.front_default
														? allPokemons[item].sprites.other.dream_world
																.front_default
														: allPokemons[item].sprites.other[
																'official-artwork'
														  ].front_default
												)
											}
										/>
									</motion.li>
								))}
							</motion.ul>
						) : (
							Object.keys(filterPokemons).map((item) => (
								<PokeCard
									key={filterPokemons[item].id}
									id={filterPokemons[item].id}
									image={
										filterPokemons[item].sprites.other.dream_world.front_default
											? filterPokemons[item].sprites.other.dream_world
													.front_default
											: filterPokemons[item].sprites.other['official-artwork']
													.front_default
									}
									name={filterPokemons[item].name}
									type={filterPokemons[item].types}
									onElemClick={() =>
										this.fetchPokemonData(
											filterPokemons[item].id,
											filterPokemons[item].name,
											filterPokemons[item].types,
											filterPokemons[item].sprites.other.dream_world
												.front_default
												? filterPokemons[item].sprites.other.dream_world
														.front_default
												: filterPokemons[item].sprites.other['official-artwork']
														.front_default
										)
									}
								/>
							))
						)}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
