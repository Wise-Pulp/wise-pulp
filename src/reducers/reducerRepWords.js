import { RECEIVE_REP_WORDS, MORE_REP_WORDS, LESS_REP_WORDS } from '../actions/actionRepWords'

export default function repWords (state = {
  words: null,
  display: null,
  index: 10
}, action) {
  switch (action.type) {
    case RECEIVE_REP_WORDS:
      return Object.assign({}, state, {
        words: action.words,
        display: action.words.slice(state.index - 10, state.index),
      })
    case MORE_REP_WORDS:
      state.index + 10 > state.words.length ? state.index = state.words.length : state.index += 10
      return Object.assign({}, state, {
        display: state.words.slice(state.index - 10, state.index),
        index: state.index
      })
    case LESS_REP_WORDS:
      state.index - 10 < 10 ? state.index = 10 : state.index -= 10
      return Object.assign({}, state, {
        display: state.words.slice(state.index - 10, state.index),
        index: state.index
      })
    default:
      return state
  }
}