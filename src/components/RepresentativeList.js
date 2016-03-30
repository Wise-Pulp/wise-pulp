import React, { Component } from 'react'
import Representative from './Representative'
import Header from './Header'

export default class RepresentativeList extends Component {
	render() {
		const { representatives } = this.props
		return (
			<div>
				<h1 className='text-center'>Polis</h1>
				<div>
					{representatives.map(function(representative) {
						let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
						return <Representative
							key={representative.id}
							representative={representative}
							image={image}
						/>
				})}
				</div>
			</div>
		)
	}
}
