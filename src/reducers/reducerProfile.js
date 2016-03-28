import { RECEIVE_REPRESENTATIVES, IS_FETCHING } from '../actions/index'

export default function representativesList(state = {
	representatives: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case IS_FETCHING: 
      return {
        isFetching: true
      }
    case RECEIVE_REPRESENTATIVES:
      return {
        representatives: action.representatives,
        isFetching: false
      }
    default:
      return state
  }
}

