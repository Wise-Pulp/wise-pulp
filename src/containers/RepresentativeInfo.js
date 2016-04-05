import React, { Component } from 'react'
import { connect } from 'react-redux'

const RepresentativeInfo = ({representative}) => (
	<div>
		<div className='row rep-info-container'>
				<div className='col-md-2 col-md-offset-2 rep-info'>
					<div>Website:</div>
					<a href={representative.website}>{representative.website}</a>
				</div>
			<div className='col-md-2 col-md-offset-1 rep-info'>
					<div>Twitter:</div>
					<a href={'https://www.twitter.com/@' + representative.person.twitterid}>@{representative.person.twitterid}</a>
			</div>
			<div className='col-md-2 col-md-offset-1 rep-info'>
					<div>Phone:</div>
					<div>{representative.phone}</div>
			</div>
			<div className='col-md-2 col-md-offset-1'></div> 
		</div>
		
	</div>
)

export default RepresentativeInfo

function mapStateToProps(state) {
  console.log(state)
  const representatives = state.Representatives.representatives
  const isFetching = state.Representatives.isFetching
  const progress = state.Spinner.progress
  const representative = state.Representatives.representative

  return {
    representatives,
    isFetching,
    representative,
    progress
  }
}

export default connect(mapStateToProps)(RepresentativeInfo)