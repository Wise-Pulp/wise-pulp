import { INCREASE_PROGRESS } from '../actions/index'

export default function updateSpinnerProgress(state = {progress: 0}, action) {
  switch (action.type) {
    case INCREASE_PROGRESS:
      if (state.progress === 100) {
        state.progress = 0
      }
      return Object.assign({}, state, {
        progress: state.progress + 10
      })
    default:
      return state
  }
}

