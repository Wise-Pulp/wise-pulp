import { GET_ROLE_BILLS, SENATE_BILL_DATA, HOUSE_BILL_DATA, ADD_TO_BILLS } from '../actions/actionBills'
 
export default function upcomingBills(state = { billsToShow: 9}, action) {
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
      case ADD_TO_BILLS:
        return Object.assign({}, state, {
          billsToShow: state.billsToShow += 10
        })
    default:
      return state
  }
}