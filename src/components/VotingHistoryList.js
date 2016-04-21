import React, { Component } from 'react'
import { connect } from 'react-redux'
import { yes, no, billVote, userVotes, loginCheck } from '../actions/actionBills'
import BillVotes from './BillVotes'

export default class VotingHistoryList extends Component {

  constructor(props) {
    super(props)

    this.onYesChange = this.onYesChange.bind(this)
    this.onNoChange = this.onNoChange.bind(this)
    this.handleLoginCheck = this.handleLoginCheck.bind(this)
  }

  handleLoginCheck(e, bill) {
    const { dispatch, yes, no, user } = this.props
    e.preventDefault()

    if (user) {
      if (bill === yes) {
        dispatch(billVote(bill, 'yes'))
        dispatch(userVotes(bill, true, user))

      } else if (bill === no) {
        dispatch(billVote(bill, 'no'))
        dispatch(userVotes(bill, false, user))

      }
    } else {
      dispatch(loginCheck(user, bill))
    }
  }

  onYesChange(bill) {
    this.props.dispatch(yes(bill))
  }

  onNoChange(bill) {
    this.props.dispatch(no(bill))
  }

 render() {
  const {repVotes, billsToShow, loginCheck} = this.props
  return (
    <div>
     {repVotes.map( (bill, i)=> {
      while (i < billsToShow) {
        return <BillVotes bill={bill} 
                     handleLoginCheck={this.handleLoginCheck}
                     onYesChange={this.onYesChange}
                     onNoChange={this.onNoChange} 
                     loginCheck={loginCheck}
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
  const loginCheck = state.user.loginCheck
  return {
    yes,
    no,
    user,
    loginCheck
  }
}

export default connect(mapStateToProps)(VotingHistoryList);