export const SENATE_BILL_DATA = 'SENATE_BILL_DATA'
export const HOUSE_BILL_DATA = 'HOUSE_BILL_DATA'
export const GET_ROLE_BILLS = 'GET_ROLE_BILLS'
export const ADD_TO_BILLS = 'ADD_TO_BILLS'
export const YES_VOTE = 'YES_VOTE'
export const NO_VOTE = 'NO_VOTE'
export const BILL_VOTE = 'BILL_VOTE'
export const REP_VOTING_HISTORY = 'REP_VOTING_HISTORY'
export const BILL_DATA = 'BILL_DATA'
export const SET_REP_ROLE = 'SET_REP_ROLE'
export const LOGIN_CHECK = 'LOGIN_CHECK'



export function getRoleBills(role) {
  if (role === 'representative') {
    return getHouseBillData()
  } else {
    return getSenateBillData()
  }
}

export function getSenateBillData() {
let senate = '/api/data/senate_bills'
  return dispatch => {
    return fetch(senate)
      .then(response => response.json())
      .then(json => dispatch(receiveSenateBillData(json))) 
  }
}

export function addBillType(bills, type, prop) {
  let newBills = []
  for (var i = 0; i < bills.length; i++) {
    newBills.push(Object.assign({}, bills[i], {
      [type]: prop
    }))
  }
  return newBills
}

export function receiveSenateBillData(bill) {
  return {
    type: BILL_DATA,
    payload: addBillType(bill, 'senate', true)
  }
}

export function getHouseBillData() {
let house = '/api/data/house_bills'

  return dispatch => {
    return fetch(house)
      .then(response => response.json())
      .then(json => dispatch(receiveHouseBillData(json))) 
  }
}

export function receiveHouseBillData(bill) {
  return {
    type: BILL_DATA,
    payload: addBillType(bill, 'representative', true)
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

export function loginCheck(user, bill) {
  let updatedBill;
  if (user) {
    updatedBill = Object.assign({}, bill, {
      login: true
    })
    
  } else {
    updatedBill = Object.assign({}, bill, {
      login: false
    })
  }
  return {
    type: LOGIN_CHECK,
    payload: updatedBill
  }
}