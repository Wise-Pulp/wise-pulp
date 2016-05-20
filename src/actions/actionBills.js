export const GET_ROLE_BILLS     = 'GET_ROLE_BILLS'
export const ADD_TO_BILLS       = 'ADD_TO_BILLS'
export const YES_VOTE           = 'YES_VOTE'
export const NO_VOTE            = 'NO_VOTE'
export const BILL_VOTE          = 'BILL_VOTE'
export const REP_VOTING_HISTORY = 'REP_VOTING_HISTORY'
export const BILL_DATA          = 'BILL_DATA'
export const SET_REP_ROLE       = 'SET_REP_ROLE'
export const LOGIN_CHECK        = 'LOGIN_CHECK'


export function getRoleBills(role) {
  if (role === 'representative') {
    return getHouseBillData()
  } else {
    return getSenateBillData()
  }
}

export function getSenateBillData(testing) {
  let senate = '/api/data/senate_bills'
  if (testing) {
    senate = 'https://localhost:3500/api/data/senate_bills'
  }
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
  console.log(localStorage.getItem('bills') !== 'undefined')
  return localStorage.getItem('bills') !== 'undefined' ? addUserBills(newBills) : newBills
}

export function addUserBills(bills) {
  let userBills = JSON.parse(localStorage.getItem('bills'))
  for (var i = 0; i < bills.length; i++) {
    for (var j = 0; j < userBills.length; j++) {
      if (userBills[j].billNumber === bills[i]._id || userBills[j].billNumber === bills[i].id) {
        console.log(userBills[j])
        console.log('this is user', userBills[j].billNumber)
        console.log('this is bills', bills[i].id)
        bills[i]['voted'] = userBills[j].decision
      } 
    }
  }
  console.log(bills)
  return bills
}

export function receiveSenateBillData(bills) {
  return {
    type: BILL_DATA,
    payload: addBillType(bills, 'senate', true)
  }
}

export function getHouseBillData(testing) {
  let house = '/api/data/house_bills'
  if (testing) {
    house = 'https://localhost:3500/api/data/house_bills'
  }

  return dispatch => {
    return fetch(house)
      .then(response => response.json())
      .then(json => dispatch(receiveHouseBillData(json))) 
  }
}

export function receiveHouseBillData(bills) {
  return {
    type: BILL_DATA,
    payload: addBillType(bills, 'representative', true)
  }
}

export function addToBills() {
  return {
    type: ADD_TO_BILLS,
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


//TODO: billVote and userVotes I think should be the same function, i.e. post to the database, on success, change the vote
//to reflect the voted upon status. userVotes should dispatch billVote
//Updates the current state of the bill to reflect the voted status
export function billVote(bill, json) {
  let updatedBill = Object.assign({}, bill, { 
    voted: json.decision 
  })
  return {
    type: BILL_VOTE,
    payload: updatedBill
  }
}

//Posts the user vote to the server => database
export function userVotes(bill, vote, user, testing) {
  let url = '/userOpinions'
  if (testing) {
    url = 'https://localhost:3500/userOpinions'
  }
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        billNumber: bill._id,
        opinion: vote
      })
    })
      .then(response => response.json())
      .then(json => dispatch(billVote(bill, json)))
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
    payload: localStorage.getItem('bills') === 'undefined' ? addUserBills(payload) : payload
  }
}

export function loginCheck(user, bill) {
  let updatedBill
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

export function updateLocalStorage() {
  fetch('/userOpinions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  })
  .then(response => response.json())
  .then(json => {
    localStorage.setItem('bills', undefined)
    localStorage.setItem('bills', JSON.stringify(json))
  })
}
export function userVotes(bill, vote, user, testing) {
  let url = '/userOpinions'
  if (testing) {
    url = 'https://localhost:3500/userOpinions'
  }
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        billNumber: bill._id,
        opinion: vote
      })
    })
      .then(response => response.json())
      .then(json => dispatch(billVote(bill, json)))
  }
}
