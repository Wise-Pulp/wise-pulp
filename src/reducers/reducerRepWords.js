import { RECEIVE_REP_WORDS, MORE_REP_WORDS, LESS_REP_WORDS } from '../actions/actionRepWords'

export default function repWords (state = {
  words: null,
  index: null
}, action) {
  switch (action.type) {
    case RECEIVE_REP_WORDS:
      return Object.assign({}, state, {
        words: action.words,
        index: 20
      })
    case MORE_REP_WORDS:
      return Object.assign({}, state, {
        words: action.words,
        index: state.index += 10
      })
    case LESS_REP_WORDS:
      return Object.assign({}, state, {
          words: action.words,
          index: state.index - 10
      })
    default:
      return state
  }
}