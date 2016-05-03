import React from 'react';
import React, { Component } from 'react';

import './Bills.scss';

const BillVotes = ({handleLoginCheck, bill, onNoChange, onYesChange}) => (
  <div>
    Bill: {bill.vote.question}<br />
    Date: {bill.vote.created}<br />
    Current Status: {bill.vote.result}<br />
    Check Out The Full Text On Govtrack <a href={bill.vote.link} target="_blank">here</a> <br />
    Your Rep Voted: {bill.option.value}<br />

    <form className="user_vote" action="#" onSubmit={e => handleLoginCheck(e, bill)}>
      <input type="radio" name="vote" value="yea" onChange={e => onYesChange(bill)}/> Yes
       <br />
      <input type="radio" name="vote" value="nay" onChange={e => onNoChange(bill)}/> No 
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
      {bill.login === false ? <div className='registration-error'>You must be logged in to vote</div> : null}
      {bill.voted ? bill.voted === 'yes' ? <div className='vote-indicator'>You voted yes!</div> : <div className='vote-indicator'>You voted no!</div> : null}
    <hr />
  </div> 
)

export default BillVotes