import { BILL_DATA, SET_REP_ROLE, SENATE_BILL_DATA, HOUSE_BILL_DATA, ADD_TO_BILLS, YES_VOTE, NO_VOTE, BILL_VOTE, REP_VOTING_HISTORY, LOGIN_CHECK } from '../actions/actionBills'

export default function upcomingBills(state = { 
  billsToShow: 9,
  yes: null,
  no: null,
  bills: [],
  role: null,
  loginChecK: false
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
        votes: action.payload
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
      return changeBillProps(state, action.payload, 'loginCheck')
    case BILL_VOTE:
      return changeBillProps(state, action.payload, 'bills')

    default:
      return state
  }
}

export function changeBillProps(state, bill, prop) {
  for (let i = 0; i < state.bills.length; i++) {
    if (state.bills[i]._id === bill._id) {
      let before = state.bills.slice(0, i)
      let after = state.bills.slice(i+1, state.bills.length)
      before.push(bill)
      let newBills = before.concat(after)
      return Object.assign({}, state, {
        [prop]: newBills
      })
    }
  }
}