import React, { Component } from 'react'
import RepresentativePicture from './RepresentativePicture'
import RepresentativeName from './RepresentativeName'
import ContributorVisualization from '../components/ContributorVisualization'
import Header from './Header'
import { Link } from 'react-router'

export default class RepresentativeList extends Component {
	render() {
		const { representatives, selectRep } = this.props
		return <div>
			<div className='row rep-container'>
				{representatives.length === 3 ? 
					representatives.map(function(representative, i) {
					let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
					return <div key={i} className='col-md-4'>
						<Link to={{ pathname: '/representatives/' + representative.id }}>
							<RepresentativePicture
								key={representative.id}
								image={image}
								selectRep={selectRep} />
							<RepresentativeName
							  key={representative.id + 1}
							  representative={representative} />
						</Link>
					</div> 
					}) 
				: representatives.map(function(representative, i) {
					let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
					return <div key={i} className='col-md-3'>
							<Link to={{ pathname: '/representatives/' + representative.id }}>
								<RepresentativePicture
									key={representative.id}
									image={image}
									selectRep={selectRep} />
								<RepresentativeName
								  key={representative.id + 1}
								  representative={representative} />
							</Link>
						</div>
					})
				}
				<h1 className='cong-reps'>Your Congressional Representatives</h1>
			</div>
		</div>
	}
}