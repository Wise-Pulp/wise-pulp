import React, { Component } from 'react'

const Representative = ({representative, image}) => (
	<div>
		<div className='col-md-4'>
			<img src={image} className='img-responsive rep-img'/>
		{representative.person.name}
		</div>
	</div>
)

export default Representative
