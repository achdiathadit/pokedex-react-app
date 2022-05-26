/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const PokeDetail = (props) => {
	return (
		<div>
			<Dialog
				aria-labelledby='customized-dialog-title'
				open={props.open}
				onBackdropClick={props.cancel}
				fullWidth
				maxWidth='md'
				className='dialog-bg noselect'
			>
				<DialogContent>PokeDetail</DialogContent>
			</Dialog>
		</div>
	);
};

export default PokeDetail;
