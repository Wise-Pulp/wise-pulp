import React, { Component } from 'react';

import './Bills.scss';

const Bill = ({handleLoginCheck, bill, onNoChange, onYesChange}) => (
  <div>
    <b>Bill Number: </b>{bill.billNumber} <br />
    <b>Bill Name: </b>{bill.billName} <br />
    <b>Current Status: </b>{bill.statusDescription}<br />
    <b>Full Text On Govtrack: </b> <a href={bill.fullTextLink} target="_blank">click here</a> <br />
    <b>Sponsored By: </b>{bill.sponsor}<br />
    <h4>Cast Your Vote!</h4>

    <form className="user_vote" action="#" onSubmit={e => handleLoginCheck(e, bill)}>
      <input type="radio" name="vote" value="yea" onChange={e => onYesChange(bill)}/> Yes
       <br />
      <input type="radio" name="vote" value="nay" onChange={e => onNoChange(bill)}/> No
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
      {bill.login === false ? <div className='registration-error'>You must be logged in to vote</div> : null}
      {bill.voted ? bill.voted === 'yes' ? <div className='vote-indicator'>You voted yes!</div> : <div>You voted no!</div> : null}
    <hr />
  </div> 
)

export default Bill