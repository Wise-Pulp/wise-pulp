import React, { Component } from 'react'

const RepresentativeInfo = ({representative}) => (
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
)

export default RepresentativeInfo