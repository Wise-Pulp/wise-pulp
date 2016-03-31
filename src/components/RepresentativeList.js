import React, { Component } from 'react'
import RepresentativePicture from './RepresentativePicture'
import RepresentativeInfo from './RepresentativeInfo'
import Header from './Header'

export default class RepresentativeList extends Component {
	render() {
		const { representative, representatives, selectRep } = this.props
		console.log(representative)
		return (
			<div>
				<div className='row rep-container'>
					{representatives.map(function(representative) {
						let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
						return <RepresentativePicture
							key={representative.id}
							representative={representative}
							image={image}
							selectRep={selectRep}
						/>
				})}
				</div>
				<div>
				{ representative ? <RepresentativeInfo representative={representative} /> : 
													 <div></div> }
				</div>
			</div>
		)
	}
}