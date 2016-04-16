export const SENATE_BILL_DATA = 'SENATE_BILL_DATA'
export const HOUSE_BILL_DATA = 'HOUSE_BILL_DATA'
export const GET_ROLE_BILLS = 'GET_ROLE_BILLS'
export const ADD_TO_BILLS = 'ADD_TO_BILLS'
export const YES_VOTE = 'YES_VOTE'
export const NO_VOTE = 'NO_VOTE'
export const BILL_VOTE = 'BILL_VOTE'
export const REP_VOTING_HISTORY = 'REP_VOTING_HISTORY'

let houseBills, senateBills

export function getRoleBills(role) {
  if( role === 'senator') {
    return dispatch => {
      return dispatch(getSenateBillData(true));
    } 
  } else {
    return dispatch => {
      return dispatch(getHouseBillData(true));
    }
  }
}

export function getSenateBillData(something) {
let senate = '/api/data/senate_bills';
  return dispatch => {
    return fetch(senate)
      .then(response => response.json())
      .then(json => dispatch(receiveSenateBillData(json, something))) 
  }
}

export function receiveSenateBillData(bill, anything) {
  senateBills = bill
  if (anything) {
    return {
      type: GET_ROLE_BILLS,
      bill
    }
  } else { 
    return {
      type: SENATE_BILL_DATA,
      bill
    } 
  }
}

export function getHouseBillData(something) {
let house = '/api/data/house_bills';

  return dispatch => {
    return fetch(house)
      .then(response => response.json())
      .then(json => dispatch(receiveHouseBillData(json, something))) 
  }
}

export function receiveHouseBillData(bill, anything) {
  houseBills = bill
  if (anything) {
    return {
      type: GET_ROLE_BILLS,
      bill
    }
  } else { 
    return {
      type: HOUSE_BILL_DATA,
      bill
    } 
  }
}

export function addToBills(bill) {
  return {
    type: ADD_TO_BILLS,
    bill
  }
}

export function yes(payload) {
  return {
    type: YES_VOTE,
    payload
  }
}

export function no(payload) {
  return {
    type: NO_VOTE,
    payload
  }
}

export function billVote(bill, voted, user) {
  let updatedBill = Object.assign({}, bill, {
    voted
  })
  return {
    type: BILL_VOTE,
    payload: updatedBill
  }
}

export function userVotes(bill, vote, user) {
  return dispatcy => {
    return fetch('/userOpinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user
      },
      body: JSON.stringify({
        billNumber: bill._id,
        opinion: vote
      })
    })
  }
}

export function getVotingHistory(rep) {
  return dispatch => {
    return fetch('https://www.govtrack.us/api/v2/vote_voter?order_by=-created&person=' + rep)
      .then(response => response.json())
      .then(json => dispatch(receiveVotingHistory(json.objects)))
  }
}

export function receiveVotingHistory(payload) {
  return {
    type: REP_VOTING_HISTORY,
    payload
  }
}