import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepresentatives } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/ProgressLabel'


export default class Profile extends Component {
  componentDidMount() {
  	this.props.dispatch(getRepresentatives(92139))
  }
  isVisible() {
    console.log(!!this.props.representatives.length, this.props.representatives.length)
    return this.props.representatives.length
  }

  render() {
    const { representatives } = this.props
    return (
      <div>
        <RepresentativeList representatives={representatives} 
                            style={{display: this.isVisible() ? 'block' : 'none'}}
        />
        <Spinner representatives={representatives} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const representatives = state.Profile.representatives
  const isFetching = state.Profile.isFetching;
  console.log(representatives)
  return {
    representatives,
    isFetching
  }
}

export default connect(mapStateToProps)(Profile)