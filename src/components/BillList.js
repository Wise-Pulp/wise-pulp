import React, { Component } from 'react'
import { connect } from 'react-redux';
import { yes, no, billVote } from '../actions/actionBills'

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
      this.props.dispatch(billVote(bill, true))
    } else if (bill === no) {
      this.props.dispatch(billVote(bill, false))
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
     { this.props.bills.map( (bill, i)=> {
      while (i < this.props.billsToShow) {
        return ( <div key={i}>
          Bill Number: {bill.billNumber}<br />
          Bill Name: {bill.billName}<br />
          Current Status: {bill.statusDescription}<br />
          Check Out The Full Text On Govtrack <a href={bill.fullTextLink} target="_blank">here</a> <br />
           Sponsored By: {bill.sponsor}<br />
          <h4>Vote!</h4>

          <form key={i}className="user_vote" action="#" onSubmit={e => this.handleSubmit(bill, e)}>
            Yes <input type="radio" name="vote" value="yea" onChange={e => this.onYesChange(bill)}/>
             <br />
            No  <input type="radio" name="vote" value="nay" onChange={e => this.onNoChange(bill)}/> 
            <br />
            <input type="submit" value='Vote!' className="btn btn-default" />
          </form>
          <hr />
          </div> )
      }
      }) }
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
    no,
    voted
  }
}

export default connect(mapStateToProps)(BillList);