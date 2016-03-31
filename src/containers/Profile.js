import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRepresentative, getRepresentatives, increaseProgress } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/Spinner'


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.selectRep = this.selectRep.bind(this)
    this.tick = this.tick.bind(this)
  }

  selectRep(rep) {
    this.props.dispatch(setRepresentative(rep))
  }

  beginSpinner() {
    this.props.dispatch(increaseProgress())
  }

  stopSpinner() {
    clearInterval(this.interval)
  }

  tick() {
    this.props.dispatch(increaseProgress())
  }

  componentDidMount() {
    console.log('this from componentDidMount', this.props)
    this.interval = setInterval(() => {
      this.tick()
      this.props.dispatch({ type: 'INCREASE_PROGRESS' })
      // TODO: Without the below lines, interval never stops. With the below
      // lines, spinner isn't animated.
      // FIX!!!!!
      // ALSO: Why does the spinner take so damn long to load?
      // if (!this.props.isFetching) {
      //   console.log(this.props.isFetching)
      //   this.stopSpinner()
      // }
    }, 50)
  }    

  render() {

    const { representative, representatives, isFetching, progress } = this.props

    return (
      <div>
        <h1 className='text-center'>Polis</h1>
        {isFetching ? <Spinner representatives={representatives} 
                               progress = {progress} 
                                /> :
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
  const progress = state.Spinner.progress
  const representative = state.Profile.representative
  console.log(state)

  return {
    representatives,
    isFetching,
    representative,
    progress
  }
}

export default connect(mapStateToProps)(Profile)