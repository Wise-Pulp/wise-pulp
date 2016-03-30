import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRepresentative, getRepresentatives, increaseProgress } from '../actions/index'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/Spinner'


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.selectRep = this.selectRep.bind(this)
  }

  selectRep(rep) {
    this.props.dispatch(setRepresentative(rep))
  }

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }

  beginSpinner() {
    while(this.props.isFetching) {
      this.props.dispatch(increaseProgress())
    }
  }

  tick() {
    console.log('hello');
    this.props.dispatch(increaseProgress())
    // while isFetching keep ticking on setInterval
  }

  componentDidMount() {
    console.log('this from componentDidMount', this.props)
    this.interval = setInterval(() => {
      this.tick()
      this.props.dispatch({ type: 'INCREASE_PROGRESS' })
    }, 50)

    // if (!isFetching) { clearInterval(this.interval) }
  }    

  render() {
    const { representative, representatives, isFetching } = this.props
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