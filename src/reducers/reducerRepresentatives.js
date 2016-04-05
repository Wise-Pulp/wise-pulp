import { SELECT_REPRESENTATIVE, RECEIVE_REPRESENTATIVES, IS_FETCHING } from '../actions/index'

export default function representativesList(state = {
	representatives: [],
  isFetching: false,
  representative: null
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
        representative: action.representatives[0]
      })
    case SELECT_REPRESENTATIVE:
      return Object.assign({}, state, {
        representative: action.rep
      })
    default:
      return state
  }
}

