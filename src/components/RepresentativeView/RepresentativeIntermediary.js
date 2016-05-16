import React, { Component } from 'react'
import RepresentativePicture from './RepresentativePicture'
import RepresentativeName from './RepresentativeName'
import RepresentativeDetails from './RepresentativeDetails'

import './RepView.scss'

const RepresentativeIntermediary = ({representative, image}) => (
	<div className='.rep-container'>
		<div className='rep-individual-header-container'>
			<div className='rep-img-container'>
				<RepresentativePicture
					image={image} />
			</div>
			<div className='rep-name-container'>
				<RepresentativeName
					representative={representative} />
			</div>	
		</div>
			<div className='rep-info-container'>
				<RepresentativeDetails
					representative={representative} />
			</div>
	</div>
)

export default RepresentativeIntermediary