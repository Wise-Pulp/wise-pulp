import React, { Component } from 'react'
import { Link } from 'react-router'

const RepresentativePicture = ({representative, image, selectRep}) => (
		<div className='col-md-4'>
			<Link to={{ pathname: '/representatives/' + representative.id }}><img src={image} className='img-responsive rep-img'/></Link>
			<div>{representative.person.firstname + ' ' + representative.person.lastname}</div>
			<div>{representative.role_type_label}</div>
		</div>
)

export default RepresentativePicture
