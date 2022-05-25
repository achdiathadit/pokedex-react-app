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
		} = this.props;
		return (
			<Box
				component='form'
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
			>
				<div className='filter-container'>
					<Autocomplete
						id='region-select'
						size='small'
						options={regions}
						value={regionValue}
						onChange={regionSelect}
						getOptionLabel={(regions) => regions.name}
						renderOption={(props, regions) => (
							<Box component='li' {...props}>
								{regions.name}&nbsp;({regions.offset + 1}-
								{regions.limit + regions.offset})
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Region'
								inputProps={{
									...params.inputProps,
								}}
							/>
						)}
					/>
					<Autocomplete
						id='type-select'
						size='small'
						options={types}
						value={typeValue}
						onChange={typeSelect}
						getOptionLabel={(types) => types}
						renderOption={(props, types) => (
							<Box component='li' {...props}>
								{types}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Type'
								inputProps={{
									...params.inputProps,
								}}
							/>
						)}
					/>
					<Autocomplete
						id='sort-by'
						size='small'
						options={sortBy}
						value={sortType}
						onChange={sortSelect}
						getOptionLabel={(sortBy) => sortBy}
						renderOption={(props, sortBy) => (
							<Box component='li' {...props}>
								{sortBy}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Sort by'
								inputProps={{
									...params.inputProps,
								}}
							/>
						)}
					/>
					<TextField
						id='search-name'
						size='small'
						label='Search'
						variant='outlined'
					/>
				</div>
			</Box>
		);
	}
}

export default FilterBar;
