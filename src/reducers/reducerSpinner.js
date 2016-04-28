import { INCREASE_PROGRESS, STOP_PROGRESS } from '../actions/actionRepresentatives'
// reducer for loading spinner
export default function updateSpinnerProgress(state = {progress: 0}, action) {
  switch (action.type) {
    case INCREASE_PROGRESS:
      if (state.progress === 100) {
        state.progress = 0
      }
      return Object.assign({}, state, {
        progress: state.progress + 10
      })
    case STOP_PROGRESS:
      clearInterval(state.interval)
      return Object.assign({}, state, {
        progress: state.progress
      })
    default:
      return state
  }
}

