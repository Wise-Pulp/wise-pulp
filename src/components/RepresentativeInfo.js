import React, { Component } from 'react'

const RepresentativeInfo = ({representative}) => (
		<div className='.rep-info-container'>
				<div className='col-md-4 rep-info'>
				Website: {representative.website}
				</div>
			<div className='col-md-4 rep-info'>
			Twitter: @{representative.person.twitterid}
			</div>
			<div className='col-md-4 rep-info'>
			Phone: {representative.phone}
			</div>
		</div>
)

export default RepresentativeInfo