import React, { Component } from 'react'
import { Link } from 'react-router'

import RepresentativePicture from './RepresentativePicture'
import RepresentativeName from './RepresentativeName'
import ContributorVisualization from './ContributorVisualization'
import Header from '../Header/Header'


import './RepView.scss';

export default class RepresentativeList extends Component {
		render() {
		const { representatives, selectRep } = this.props
		return <div className='rep-container'>
			<h1 className='text-center'>Your Congressional Representatives</h1>
				{representatives.length === 3 ? 
					representatives.map(function(representative, i) {
					let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
					return <div key={i} className='rep-pic'>
						<Link to={{ pathname: '/representatives/' + representative.person.id }}>
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
				: 
			representatives.map(function(representative, i) {
				let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
				return <div key={i} className='rep-container'>
							<Link to={{ pathname: '/representatives/' + representative.person.id }}>
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
			</div>
	}
}