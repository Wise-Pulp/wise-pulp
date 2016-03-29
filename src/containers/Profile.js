import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepresentatives, increaseProgress } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/ProgressLabel'


export default class Profile extends Component {

  tick() {
    this.props.progress = 0
    this.props.dispatch(increaseProgress())
    this.setState({progress: this.props.progress})
    // method name
    while (this.props.isFetching) {
      increaseProgress()
    }
    // while isFetching keep ticking on setInterval
  }

  componentDidMount() {
    //if isFetching is true, start the tick method
    //tick method dispatches an action creator every second or that updates
    if (this.props.isFetching) {
      tick()
    }
    //the state
    //which has a variable called progress in it, which is then tied
    //to the spinner like <Spinner progress={progress}>
  	this.props.dispatch(getRepresentatives(92139))
  }

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

function mapStateToProps(state, ownProps) {
  const representatives = state.Profile.representatives
  const isFetching = state.Profile.isFetching;
  // progress props

  console.log(state)
  return {
    representatives,
    isFetching
  }
}

export default connect(mapStateToProps)(Profile)