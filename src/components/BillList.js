import React, { Component } from 'react'
import { connect } from 'react-redux';
import { yes, no, billVote } from '../actions/actionBills'
import Bill from './Bill'

export default class BillList extends Component {

  constructor(props) {
    super(props)

    this.onYesChange = this.onYesChange.bind(this)
    this.onNoChange = this.onNoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(bill, e) {
    e.preventDefault()
    const { dispatch, yes, no } = this.props
    if (bill === yes) {
      this.props.dispatch(billVote(bill, 'yes'))
    } else if (bill === no) {
      this.props.dispatch(billVote(bill, 'no'))
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
        return <Bill bill={bill} 
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
  return {
    yes,
    no
  }
}

export default connect(mapStateToProps)(BillList);