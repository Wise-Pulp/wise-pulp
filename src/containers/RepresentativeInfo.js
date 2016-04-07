import React, { Component } from 'react'
import { connect } from 'react-redux'
import RepresentativeIntermediary from '../components/RepresentativeIntermediary'
import RepresentativeLeftNavBar from '../components/RepresentativeLeftNavBar'
import ContributorVisualization from '../components/ContributorVisualization'
import { getCurrentPosition, getRepresentatives } from '../actions/index'

export default class RepresentativeInfo extends Component {

	render() {
		const { params, representatives } = this.props
		return (
			<div>
				{representatives.map(function(representative, i) {
					if (representative.id === JSON.parse(params.id)) {
						let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
						return ( 
							<RepresentativeIntermediary
								representative={representative}
								image={image} 
								key={i} />
						)
					}
				})}
				<div className='row'>
					<div className='col-md-2 rep-left-navbar'>
						<RepresentativeLeftNavBar />
					</div>
					<div className='col-md-10 rep-info-graph-container'>
						<ContributorVisualization />
					</div>
				</div>
			</div>
		)
	}
}

export default RepresentativeInfo

function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  return {
    representatives,
  }
}

export default connect(mapStateToProps)(RepresentativeInfo)
