import React, { Component } from 'react'

const Bill = ({handleSubmit, bill, onNoChange, onYesChange}) => (
  <div>
    Bill Number: {bill.billNumber}<br />
    Bill Name: {bill.billName}<br />
    Current Status: {bill.statusDescription}<br />
    Check Out The Full Text On Govtrack <a href={bill.fullTextLink} target="_blank">here</a> <br />
     Sponsored By: {bill.sponsor}<br />
    <h4>Vote!</h4>

    <form className="user_vote" action="#" onSubmit={e => handleSubmit(bill, e)}>
      Yes <input type="radio" name="vote" value="yea" onChange={e => onYesChange(bill)}/>
       <br />
      No  <input type="radio" name="vote" value="nay" onChange={e => onNoChange(bill)}/> 
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
      {bill.voted ? bill.voted === 'yes' ? <div>You voted yes!</div> : <div>You voted no!</div> : null}
    <hr />
  </div> 
)

export default Bill