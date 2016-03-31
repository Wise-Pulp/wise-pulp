import React, { Component } from 'react'

const RepresentativePicture = ({representative, image, selectRep}) => (
		<div className='col-md-4'>
			<img onClick={e => selectRep(representative)} src={image} className='img-responsive rep-img'/>
			<div>{representative.person.firstname + ' ' + representative.person.lastname}</div>
			<div>{representative.role_type_label}</div>
		</div>
)

export default RepresentativePicture
