import { GET_ROLE_BILLS, SENATE_BILL_DATA, HOUSE_BILL_DATA, ADD_TO_BILLS, YES_VOTE, NO_VOTE, BILL_VOTE, REP_VOTING_HISTORY } from '../actions/actionBills'

export default function upcomingBills(state = { 
  billsToShow: 9,
  yes: null,
  no: null
}, action) {
  switch (action.type) {
    case SENATE_BILL_DATA:
      return Object.assign({}, state, {
        senate: action.bill
      })
    case HOUSE_BILL_DATA:
      return Object.assign({}, state, {
        house: action.bill
      })
    case GET_ROLE_BILLS:
      return Object.assign({}, state, {
        congress: action.bill
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
    case BILL_VOTE:
      for (let i = 0; i < state.house.length; i++) {
        if (state.house[i]._id === action.payload._id) {
          let before = state.house.slice(0, i)
          let after = state.house.slice(i+1, state.house.length - 1)
          before.push(action.payload)
          let newHouse = before.concat(after)

          return Object.assign({}, state, {
            house: newHouse
          })
        }
      }

      for (let i = 0; i < state.senate.length; i++) {
        if (state.senate[i]._id === action.payload._id) {
          let before = state.senate.slice(0, i)
          let after = state.senate.slice(i+1, state.senate.length - 1)
          before.push(action.payload)
          let newSenate = before.concat(after)

          return Object.assign({}, state, {
            senate: newSenate
          })
        }
      }

    default:
      return state
  }
}