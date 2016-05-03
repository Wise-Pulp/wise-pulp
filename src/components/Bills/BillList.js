import React, { Component } from 'react';
import { connect } from 'react-redux';
import { yes, no, billVote, userVotes, loginCheck } from '../../actions/actionBills';
import Bill from './Bill';
import './Bills.scss';

export default class BillList extends Component {

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
  const {dispatch, bills, billsToShow, role} = this.props
  let count = 0
  return (
    <div>
     {bills.map( (bill, i)=> {
      if (role) {
        if (bill[role]) {
          while (count < billsToShow) {
            count++
            return <Bill bill={bill} 
                         handleLoginCheck={this.handleLoginCheck}
                         onYesChange={this.onYesChange}
                         onNoChange={this.onNoChange} 
                         key={i}/>
          }
         }
      } else {
          while (count < billsToShow) {
              count++
              return <Bill bill={bill} 
                           handleLoginCheck={this.handleLoginCheck}
                           onYesChange={this.onYesChange}
                           onNoChange={this.onNoChange} 
                           key={i}/>
        }
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

export default connect(mapStateToProps)(BillList);