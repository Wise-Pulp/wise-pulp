import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepresentatives, increaseProgress, stopProgress, getRepInfo } from '../actions/index'
import { getContributorData } from '../actions/actionContributor'
import RepresentativeList from '../components/RepresentativeList'
import Spinner from '../components/Spinner'


export default class Representatives extends Component {
  constructor(props) {
    super(props)
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

  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick()
      if (this.props.isFetching) {
        this.props.dispatch({ type: 'INCREASE_PROGRESS' })
      } else {
        this.props.dispatch({type: 'STOP_PROGRESS'})
        this.stopSpinner()
      }
    }, 100)
  }

  componentWillMount() {
    window.navigator.geolocation.getCurrentPosition(function(pos){
      fetch('/api/zipcode/' + pos.coords.latitude + '/' + pos.coords.longitude)
        .then(response => response.json())
        .then(location => {
          this.props.dispatch(getRepresentatives(location.results[0].address_components[0].short_name))
          this.props.dispatch(getContributorData(location.results[0].address_components[0].short_name))
      })
    }.bind(this))
  }


  render() {
    const { representatives, isFetching, progress } = this.props
    return (
      <div>
        <h1 className='text-center'>Polis</h1>
        {isFetching ? <Spinner representatives={representatives} 
                               progress={progress} 
                                /> :
        <RepresentativeList representatives={representatives}
                            selectRep={this.selectRep} 
                            /> }        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const isFetching = state.Representatives.isFetching
  const progress = state.Spinner.progress

  return {
    representatives,
    isFetching,
    progress
  }
}

export default connect(mapStateToProps)(Representatives)