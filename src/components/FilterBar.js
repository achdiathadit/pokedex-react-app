/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/FilterBar.css';

export class FilterBar extends Component {
	render() {
		const { regionValue, regionSelect, regions, typeValue, typeSelect, types } =
			this.props;
		return (
			<div className='filter-container noselect'>
				<div className='filter-items'>
					<Autocomplete
						id='region-select'
						sx={{ width: 300 }}
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
				</div>
				<div className='filter-items'>
					<Autocomplete
						id='type-select'
						sx={{ width: 300 }}
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
				</div>
			</div>
		);
	}
}

export default FilterBar;
