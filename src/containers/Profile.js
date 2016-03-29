import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepresentatives, increaseProgress } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/ProgressLabel'


export default class Profile extends Component {

  render() {
    const { representatives, isFetching } = this.props
    return (
      <div>
        {isFetching ? <Spinner representatives={representatives} /> :
        <RepresentativeList representatives={representatives}/> }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const representatives = state.Profile.representatives
  const isFetching = state.Profile.isFetching;

  return {
    representatives,
    isFetching
  }
}

export default connect(mapStateToProps)(Profile)