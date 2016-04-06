import React, { Component } from 'react'
import RepresentativeOptions from './RepresentativeOptions'

export default class RepresentativeLeftNavBar extends Component {

	render() {
		let options = ['Gun Control', 'Women\'s Rights', 'Education', 'Health Care']
		return (
			<div>
				{options.map(function(option, i) {
					return <RepresentativeOptions option={option} 
																				key={i} />
				})}
			</div>
		)
	}
}

export default RepresentativeLeftNavBar