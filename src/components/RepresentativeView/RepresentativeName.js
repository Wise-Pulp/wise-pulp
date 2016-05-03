import React, { Component } from 'react'

import './RepView.scss';

const RepresentativeName = ({representative}) => (
		<div>
			<div className='rep-name'>{representative.person.firstname + ' ' + representative.person.lastname}</div>
			<div className='rep-role'>{representative.role_type_label}</div>
		</div>
)

export default RepresentativeName