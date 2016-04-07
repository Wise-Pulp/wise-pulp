import { SENATE_BILL_DATA, HOUSE_BILL_DATA } from '../actions/actionBills'
 
export default function upcomingBills(state = {}, action) {
  switch (action.type) {
    case SENATE_BILL_DATA:
      return Object.assign({}, state, {
        senate: action.bill
      })
    case HOUSE_BILL_DATA:
      return Object.assign({}, state, {
        house: action.bill
      })
    default:
      return state
  }
}