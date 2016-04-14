import React, { Component } from 'react'

export default class BillList extends Component {
 render() {
  console.log('props', this.props)
  return (
    <div>
     { this.props.bills.map( (bill, i)=> {
      while (i < this.props.billsToShow) {
        return ( <div>
          Bill Number: {bill.billNumber}<br />
          Bill Name: {bill.billName}<br />
          Current Status: {bill.statusDescription}<br />
          Check Out The Full Text On Govtrack <a href={bill.fullTextLink} target="_blank">here</a> <br />
           Sponsored By: {bill.sponsor}<br />
          <h4>Vote!</h4>
          <form className="user_vote">
            Yes <input type="radio" name="vote" value="yea" />
             <br />
            No  <input type="radio" name="vote" value="nay" /> 
            <br />
            <button type="button" className="btn btn-default">Vote!</button>
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
