import { RECEIVE_REPRESENTATIVES, IS_FETCHING } from '../actions/index'
import { ADD_TO_BILLS } from '../actions/actionBills'

export default function representativesList(state = {
	representatives: [],
  isFetching: false,
}, action) {
  switch (action.type) {
    case IS_FETCHING: 
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_REPRESENTATIVES:
      return Object.assign({}, state, {
        representatives: action.representatives,
        isFetching: false,
      })
    default:
      return state
  }
}

