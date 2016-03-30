import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRepresentative, getRepresentatives, increaseProgress } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/ProgressLabel'


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.selectRep = this.selectRep.bind(this)
  }

  selectRep(rep) {
    this.props.dispatch(setRepresentative(rep))
  }

  render() {
    const { representative, representatives, isFetching } = this.props
    return (
      <div>
        <h1 className='text-center'>Polis</h1>
        {isFetching ? <Spinner representatives={representatives} /> :
        <RepresentativeList representatives={representatives}
                            representative={representative}
                            selectRep={this.selectRep} 
                            /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const representatives = state.Profile.representatives
  const isFetching = state.Profile.isFetching
  const representative = state.Profile.representative
  console.log(state)

  return {
    representatives,
    isFetching,
    representative
  }
}

export default connect(mapStateToProps)(Profile)