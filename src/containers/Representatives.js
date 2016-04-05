import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRepresentative, getRepresentatives, increaseProgress, stopProgress, getRepInfo } from '../actions/index'
import { setContributorData } from '../actions/actionContributor'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/Spinner'



export default class Representatives extends Component {
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
    this.props.dispatch(stopProgress())
    setTimeout(()=>{
      clearInterval(this.interval);
    }, 5000)
  }

  tick() {
    this.props.dispatch(increaseProgress())
  }

  // componentDidMount() {
  //   //this.props.dispatch(setContributorData())
  //   this.interval = setInterval(() => {
  //     this.tick()
  //     if (this.props.isFetching) {
  //       this.props.dispatch({ type: 'INCREASE_PROGRESS' })
  //     } else {
  //       this.props.dispatch({type: 'STOP_PROGRESS'})
  //       this.stopSpinner()
  //     }
  //   }, 50)
  // }    

  render() {

    const { representative, representatives, isFetching, progress } = this.props

    return (
      <div>
        <h1 className='text-center'>Polis</h1>
        {isFetching ? <Spinner representatives={representatives} 
                               progress={progress} 
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
  console.log(state)
  const representatives = state.Representatives.representatives
  const isFetching = state.Representatives.isFetching
  const progress = state.Spinner.progress
  const representative = state.Representatives.representative

  return {
    representatives,
    isFetching,
    representative,
    progress
  }
}

export default connect(mapStateToProps)(Representatives)