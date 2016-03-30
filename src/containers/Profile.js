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

  beginSpinner() {
    while(this.props.isFetching) {
      this.props.dispatch(increaseProgress())
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.beginSpinner.bind(this), 400)
  }    

  render() {
<<<<<<< 02447e2b4075506aeadf0ca328a86403b184af3e
    const { representative, representatives, isFetching } = this.props
    return (
      <div>
        <h1 className='text-center'>Polis</h1>
        {isFetching ? <Spinner representatives={representatives} /> :
        <RepresentativeList representatives={representatives}
                            representative={representative}
                            selectRep={this.selectRep} 
                            /> }
=======
    const { representatives, isFetching, progress } = this.props
    if (!isFetching) { clearInterval(this.interval);}
    return (
      <div>
        {isFetching ? <Spinner representatives={representatives} 
                               progress = {progress} 
                                /> :
        <RepresentativeList representatives={representatives}/> }
        
>>>>>>> Rebasing for beginning of the day
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