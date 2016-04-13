import React, { Component } from 'react'

export default class BillList extends Component {
 render() {
  return (
    <div>
     { this.props.bills.map( (bill, i)=> {
      if (this.props.index === i) {
        console.log('this index', this.props.index, 'i', i);
        return;
      }
      while (i < 9) {
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
     <button type="button" className="btn btn-default show_more_bills">More</button>
    </div> 
  )
 } 
}
