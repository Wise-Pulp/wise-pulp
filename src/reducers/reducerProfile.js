import { RECEIVE_REPRESENTATIVES } from '../actions/index'

export default function representativesList(state = {
	representatives: []
}, action) {
  switch (action.type) {
    case RECEIVE_REPRESENTATIVES:
      return {
        representatives: action.representatives
      }
    default:
      return state
  }
}

