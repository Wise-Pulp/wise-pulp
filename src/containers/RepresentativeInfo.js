import React, { Component } from 'react'
import { connect } from 'react-redux'
import RepresentativePicture from '../components/RepresentativePicture'
import RepresentativeDetails from '../components/RepresentativeDetails'

export default class RepresentativeInfo extends Component {
	render() {
		const { params, representatives } = this.props
		return (
			<div>
				{representatives.map(function(representative, i) {
					if (representative.id === JSON.parse(params.id)) {
						let image = 'https://www.govtrack.us/data/photos/' + representative.person.id + '-200px.jpeg'
						return (
							<div>
								<div key={i} className='rep-container'>
									<RepresentativePicture
										key={representative.id}
										representative={representative}
										image={image} />
								</div>
								<div className='rep-info-container'>
									<RepresentativeDetails
										representative={representative}
										key={i} />
								</div>
							</div>
						)
					}
				})}
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
