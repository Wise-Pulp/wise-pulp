import React, { Component } from 'react'

const Representative = ({representative, image}) => (
		<div className='col-md-3 col-md-offset-1'>
			<img src={image} className='img-responsive rep-img'/>
			{representative.person.name}
		</div>
)

export default Representative
