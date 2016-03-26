import React, { PropTypes } from 'react'
import Representative from './Representative'

const RepresentativeList = ({representatives}) => (
	<ul>
		{representatives.map(representative => 
			<Representative
				key={representative.id}
				representative={representative}
			/>
	)}
	</ul>
)

export default RepresentativeList