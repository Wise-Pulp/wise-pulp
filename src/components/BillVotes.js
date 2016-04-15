import React, { Component } from 'react'

const BillVotes = ({handleSubmit, bill, onNoChange, onYesChange}) => (
  <div>
    Bill: {bill.vote.question}<br />
    Date: {bill.vote.created}<br />
    Current Status: {bill.vote.result}<br />
    Check Out The Full Text On Govtrack <a href={bill.vote.link} target="_blank">here</a> <br />
    Your Rep Voted: {bill.option.value}<br />
    <h4>Vote!</h4>

    <form className="user_vote" action="#" onSubmit={e => handleSubmit(bill, e)}>
      Yes <input type="radio" name="vote" value="yea" onChange={e => onYesChange(bill)}/>
       <br />
      No  <input type="radio" name="vote" value="nay" onChange={e => onNoChange(bill)}/> 
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
      {bill.vote ? bill.vote === 'yes' ? <div>You voted yes!</div> : <div>You voted no!</div> : null}
    <hr />
  </div> 
)

export default BillVotes