import React, { Component } from 'react'
import RepresentativePicture from './RepresentativePicture'
import RepresentativeName from './RepresentativeName'
import RepresentativeDetails from './RepresentativeDetails'

const RepresentativeIntermediary = ({representative, image}) => (
	<div>
		<div className='row rep-individual-header-container'>
			<div className='rep-img-container col-lg-2'>
				<RepresentativePicture
					image={image} />
			</div>
			<div className='rep-name-container col-lg-2'>
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