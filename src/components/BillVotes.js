import React, { Component } from 'react'

const BillVotes = ({handleLoginCheck, bill, onNoChange, onYesChange, loginCheck}) => (
  <div>
    Bill: {bill.vote.question}<br />
    Date: {bill.vote.created}<br />
    Current Status: {bill.vote.result}<br />
    Check Out The Full Text On Govtrack <a href={bill.vote.link} target="_blank">here</a> <br />
    Your Rep Voted: {bill.option.value}<br />
    <h4>Vote!</h4>

    <form className="user_vote" action="#" onSubmit={e => handleLoginCheck(bill, e)}>
      Yes <input type="radio" name="vote" value="yea" onChange={e => onYesChange(bill)}/>
       <br />
      No  <input type="radio" name="vote" value="nay" onChange={e => onNoChange(bill)}/> 
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
    {!loginCheck ? <div className='registration-error'>You must be logged in if you want your votes to be saved</div> : null}
    {bill.voted ? bill.voted === 'yes' ? <div className='voted'>You voted yes!</div> : <div>You voted no!</div> : null}
    <hr />
  </div> 
)

export default BillVotes