import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class RepresentativeInfo extends Component {
	render() {
		const { params, representatives } = this.props
		return (
			<div>
				{representatives.map(function(representative) {
					if (representative.id === JSON.parse(params.id)) {
						return <div>{representative.person.firstname}</div>
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
				// <div className='row rep-info-container'>
				// 		<div className='col-md-2 col-md-offset-2 rep-info'>
				// 			<div>Website:</div>
				// 			<a href={representative.website}>{representative.website}</a>
				// 		</div>
				// 	<div className='col-md-2 col-md-offset-1 rep-info'>
				// 			<div>Twitter:</div>
				// 			<a href={'https://www.twitter.com/@' + representative.person.twitterid}>@{representative.person.twitterid}</a>
				// 	</div>
				// 	<div className='col-md-2 col-md-offset-1 rep-info'>
				// 			<div>Phone:</div>
				// 			<div>{representative.phone}</div>
				// 	</div>
				// 	<div className='col-md-2 col-md-offset-1'></div> 
				// </div>