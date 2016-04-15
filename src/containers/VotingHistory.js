import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVotingHistory, addToBills } from '../actions/actionBills';
import VotingHistoryList from '../components/VotingHistoryList'
import Spinner from '../components/Spinner'

export class VotingHistory extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills());
  }

  componentDidMount() {
    const { params, representatives, dispatch } = this.props
    representatives.map(function(rep) {
      if (rep.person.id === JSON.parse(params.id)) {
        dispatch(getVotingHistory(rep.person.id))
      }
    }.bind(this))
  }

  render() {
    const { bills, billsToShow } = this.props;
    return (
      <div>
        { bills ? <VotingHistoryList bills={bills} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> : <div><Spinner /></div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const bills = state.UpcomingBills.votes
  var billsToShow = state.UpcomingBills.billsToShow
  //console.log(state)
  return {
    representatives,
    bills,
    billsToShow
  }
}

export default connect(mapStateToProps)(VotingHistory);