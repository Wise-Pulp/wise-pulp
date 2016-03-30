import { SELECT_REPRESENTATIVE, RECEIVE_REPRESENTATIVES, IS_FETCHING } from '../actions/index'

export default function representativesList(state = {
	representatives: [],
  isFetching: false,
  representative: null
}, action) {
  switch (action.type) {
    case IS_FETCHING: 
      return {
        isFetching: true
      }
    case RECEIVE_REPRESENTATIVES:
      return {
        representatives: action.representatives,
        isFetching: false,
        representative: action.representatives[0]
      }
    case SELECT_REPRESENTATIVE:
      return {
        representative: action.rep
      }
    default:
      return state
  }
}

