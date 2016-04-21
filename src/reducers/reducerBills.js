import { BILL_DATA, SET_REP_ROLE, SENATE_BILL_DATA, HOUSE_BILL_DATA, ADD_TO_BILLS, YES_VOTE, NO_VOTE, BILL_VOTE, REP_VOTING_HISTORY, LOGIN_CHECK } from '../actions/actionBills'
import { USER_LOGIN_SUCCESS } from '../actions/actionLogin'

export default function upcomingBills(state = { 
  billsToShow: 9,
  yes: null,
  no: null,
  bills: [],
  repVotes: [],
  role: null
}, action) {
  switch (action.type) {
    case BILL_DATA:
      return Object.assign({}, state, {
        bills: state.bills.concat(action.payload)
      })
    case SET_REP_ROLE:
      return Object.assign({}, state, {
        role: action.payload
      })
    case REP_VOTING_HISTORY:
      return Object.assign({}, state, {
        repVotes: action.payload
      })
    case ADD_TO_BILLS:
      return Object.assign({}, state, {
        billsToShow: state.billsToShow += 10
      })
    case YES_VOTE:
      return Object.assign({}, state, {
        yes: action.payload,
        no: null
      })
    case NO_VOTE:
      return Object.assign({}, state, {
        no: action.payload,
        yes: null
      })
    case LOGIN_CHECK:
      return changeBillProps(state, action.payload)
    case BILL_VOTE:
      return changeBillProps(state, action.payload)
    case USER_LOGIN_SUCCESS:
      return changeLoginToTrue(state, state.bills, 'bills')
    default:
      return state
  }
}

export function changeBillProps(state, bill) {
  if (bill._id) {
    return idChecker(state, state.bills, bill, '_id', 'bills')
  } else {
    return idChecker(state, state.repVotes, bill, 'id', 'repVotes')
  }
}

export function idChecker(state, type, bill, id, prop) {
  for (let i = 0; i < type.length; i++) {
    if (type[i][id] === bill[id]) {
      let before = type.slice(0, i)
      let after = type.slice(i + 1, type.length)
      before.push(bill)
      let newBills = before.concat(after)
      return Object.assign({}, state, {
        [prop]: newBills
      })
    }
  }
}

export function changeLoginToTrue(state, type, prop) {
  let newBills = []
  for (let i = 0; i < type.length; i++) {
    let newBill = type[i]
    if (newBill.login === false) {
      newBill = Object.assign({}, newBill, {
        login: true
      })
    }
    newBills.push(newBill)
  }
  return Object.assign({}, state, {
    [prop]: newBills
  })
}