import React, { Component } from 'react';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import Header from './components/Header';
import PokeCard from './components/PokeCard';
import PokeDetail from './components/PokeDetail';

export class App extends Component {
	render() {
		return (
			<div>
				<PokeDetail />
				<Header />
				<FilterBar />
				<PokeCard />
				<Footer />
			</div>
		);
	}
}

export default App;
