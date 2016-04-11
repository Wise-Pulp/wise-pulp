import { GET_ROLE_BILLS, SENATE_BILL_DATA, HOUSE_BILL_DATA } from '../actions/actionBills'
 
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
    case GET_ROLE_BILLS:
      console.log('action', action)
      return Object.assign({}, state, {
        congress: action.bill
      })
    default:
      return state
  }
}