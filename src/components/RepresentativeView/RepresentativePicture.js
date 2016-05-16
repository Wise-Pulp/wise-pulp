import React, { Component } from 'react'

import './RepView.scss';

const RepresentativePicture = ({image}) => (
		<div>
			<img src={image} className='rep-img'/>
		</div>
)

export default RepresentativePicture
