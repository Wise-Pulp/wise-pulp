import React, { Component } from 'react'

export default class BillList extends Component {
 render() {
  return (
    <div>
     { this.props.bills.map( (bill)=> {
      return ( <div>
        Bill Number: {bill.billNumber}<br />
        Bill Name: {bill.billName}<br />
        Current Status: {bill.statusDescription}<br />
        Check Out The Full Text On Govtrack <a href={bill.fullTextLink} target="_blank">here</a> <br />
        Sponsored By: {bill.sponsor}<br />
        <a href="#">Vote!</a>
        <hr />
        </div> )
      }) }
    </div> 
  )
 } 
}
