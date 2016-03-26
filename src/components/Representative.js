import React, { Component } from 'react'

const Representative = ({representative, image}) => (
	<ul>
		<img src={image} />
		{representative.person.name}
	</ul>
)

export default Representative
