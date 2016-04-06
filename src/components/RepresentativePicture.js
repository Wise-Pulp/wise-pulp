import React, { Component } from 'react'

const RepresentativePicture = ({representative, image}) => (
		<div>
			<img src={image} className='img-responsive rep-img'/>
			<div>{representative.person.firstname + ' ' + representative.person.lastname}</div>
			<div>{representative.role_type_label}</div>
		</div>
)

export default RepresentativePicture
