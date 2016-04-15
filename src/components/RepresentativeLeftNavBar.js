import React, { Component } from 'react'
import { Link }from 'react-router'

export default class RepresentativeLeftNavBar extends Component {

	render() {
		return (
			<div className="rep-left-navbar">
				<Link to={{ pathname: 'representatives/' + this.props.id + '/voting_history'}} className="option">Voting History</Link><br />
				<hr />
				<Link to={{ pathname: 'representatives/' + this.props.id + '/campaign_contributions'}} className="option">Campaign Contributions</Link>
				<br />
				<hr />
				<Link to={{ pathname: 'representatives/' + this.props.id + '/words'}} className="option">Frequently Used Words</Link><hr />
			</div>
		)
	}
}

export default RepresentativeLeftNavBar