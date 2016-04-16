import { RECEIVE_REP_WORDS, MORE_REP_WORDS, LESS_REP_WORDS } from '../actions/index'

export default function repWords (state = {
  words: null,
  index: 10
}, action) {
  switch (action.type) {
    case RECEIVE_REP_WORDS:
      return Object.assign({}, state, {
        words: action.words,
      })
    case MORE_REP_WORDS:
      return Object.assign({}, state, {
        words: action.words,
        index: state.index += 10
      })
    case LESS_REP_WORDS:
      return Object.assign({}, state, {
          words: action.words,
          index: state.index - 10 || 0
      })
    default:
      return state
  }
}