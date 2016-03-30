import { INCREASE_PROGRESS } from '../actions/index'

export default function updateSpinnerProgress(state = {progress: 0}, action) {
  switch (action.type) {
    case INCREASE_PROGRESS:
      return {
        progress: state.progress + 10
      }
    default:
      return state
  }
}

