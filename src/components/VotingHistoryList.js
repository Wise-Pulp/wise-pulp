import React, { Component } from 'react'
import { connect } from 'react-redux'
import { yes, no, billVote, userVotes } from '../actions/actionBills'
import BillVotes from './BillVotes'

export default class VotingHistoryList extends Component {

  constructor(props) {
    super(props)

    this.onYesChange = this.onYesChange.bind(this)
    this.onNoChange = this.onNoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(bill, e) {
    e.preventDefault()
    const { dispatch, yes, no, user } = this.props
    if (bill === yes) {
      dispatch(billVote(bill, 'yes'))
      dispatch(userVotes(bill, true, user))

    } else if (bill === no) {
      dispatch(billVote(bill, 'no'))
      dispatch(userVotes(bill, false, user))

    }
  }

  onYesChange(bill) {
    this.props.dispatch(yes(bill))
  }

  onNoChange(bill) {
    this.props.dispatch(no(bill))
  }

 render() {
  return (
    <div>
     {this.props.bills.map( (bill, i)=> {
      while (i < this.props.billsToShow) {
        return <BillVotes bill={bill} 
                     handleSubmit={this.handleSubmit}
                     onYesChange={this.onYesChange}
                     onNoChange={this.onNoChange} 
                     key={i}/>
       }
      }) 
      }
     <button type="button" className="btn btn-default show_more_bills" onClick={e => this.props.showMoreBills()}>More</button>
    </div> 
  )
 } 
}

function mapStateToProps(state) {
  const yes = state.UpcomingBills.yes
  const no = state.UpcomingBills.no
  const user = state.user.isLoggedIn
  return {
    yes,
    no,
    user
  }
}

export default connect(mapStateToProps)(VotingHistoryList);