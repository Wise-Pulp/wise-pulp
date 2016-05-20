import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVotingHistory, addToBills, updateLocalStorage } from '../../actions/actionBills'
import VotingHistoryList from '../../components/Bills/VotingHistoryList'
import Spinner from '../../components/Spinner/Spinner'

export class VotingHistory extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills())
  }

  componentWillMount() {
    const { params, representatives, dispatch } = this.props
    representatives.map(function(rep) {
      if (rep.person.id === JSON.parse(params.id)) {
        dispatch(getVotingHistory(rep.person.id))
      }
    }.bind(this))
  }

  componentWillUnmount() {
    updateLocalStorage()
  }

  render() {
    const { repVotes, billsToShow } = this.props
    return (
      <div>
        { repVotes.length ? <VotingHistoryList repVotes={repVotes} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> : <div><Spinner /></div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const repVotes = state.UpcomingBills.repVotes
  const billsToShow = state.UpcomingBills.billsToShow
  return {
    representatives,
    repVotes,
    billsToShow
  }
}

export default connect(mapStateToProps)(VotingHistory)