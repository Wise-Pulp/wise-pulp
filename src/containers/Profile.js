import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepresentatives } from '../actions/index'
import ReprentativeList from '../components/RepresentativeList'

export default class Profile extends Component {
  componentDidMount() {
  	this.props.dispatch(getRepresentatives(94611))
  }
  render() {
    const { representatives } = this.props
    return (
      <div>
        {representatives.length ? <ReprentativeList representatives={representatives} /> : <div>Loading...</div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const representatives = state.Profile.representatives
  console.log(representatives)
  return {
    representatives
  }
}

export default connect(mapStateToProps)(Profile)