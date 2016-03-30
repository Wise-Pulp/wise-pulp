import React, { Component } from 'react'

const RepresentativePicture = ({representative, image, selectRep}) => (
		<div className='col-md-3 col-md-offset-1'>
			<img onClick={e => selectRep(representative)} src={image} className='img-responsive rep-img'/>
			{representative.person.firstname + ' ' + representative.person.lastname + '\n'}
			{representative.role_type_label}
		</div>
)

export default RepresentativePicture
