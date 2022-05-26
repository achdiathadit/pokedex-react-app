/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/FilterBar.css';

export class FilterBar extends Component {
	render() {
		const {
			regionValue,
			regionSelect,
			regions,
			typeValue,
			typeSelect,
			types,
			sortBy,
			sortType,
			sortSelect,
			searchValue,
			searchChange,
		} = this.props;
		return (
			<div className='filter-container'>
				<div className='filter-items'>
					<h2>Region</h2>
					<select value={regionValue} onChange={regionSelect}>
						{regions.map((region) => (
							<option key={region.name} value={region.name}>
								{region.name}&nbsp;({region.offset + 1}-
								{region.limit + region.offset})
							</option>
						))}
					</select>
				</div>
				<div className='filter-items'>
					<h2>Type</h2>
					<select value={typeValue} onChange={typeSelect}>
						{types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				<div className='filter-items'>
					<h2>Sort by</h2>
					<select value={sortType} onChange={sortSelect}>
						{sortBy.map((sort) => (
							<option key={sort} value={sort}>
								{sort}
							</option>
						))}
					</select>
				</div>
				<div className='filter-items'>
					<h2>Search</h2>
					<input type='text' value={searchValue} onChange={searchChange} />
				</div>
			</div>
		);
	}
}

export default FilterBar;
