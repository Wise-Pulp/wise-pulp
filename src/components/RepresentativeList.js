import React, { Component } from 'react'
import Representative from './Representative'

export default class RepresentativeList extends Component {
	render() {
		const { representatives } = this.props
		return (
			<div>
				<div className='row'>
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
