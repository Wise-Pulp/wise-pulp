export const RECEIVE_REP_WORDS = 'RECEIVE_REP_WORDS'
export const MORE_REP_WORDS = 'MORE_REP_WORDS'
export const LESS_REP_WORDS = 'LESS_REP_WORDS'

let allWords = []

export function getRepWords(rep) {
  return dispatch => {
    return fetch('/api/words/' + rep)
      .then(response => response.json())
      .then(json => dispatch(receiveRepWords(json)))
  }
}

export function receiveRepWords(payload) {
  allWords = payload
  let words = makeWordsData(payload, 10)
  return {
    type: RECEIVE_REP_WORDS,
    words
  }
}

function makeWordsData(words, index) {
  let array = []
  for (var i = index - 10; i <= index; i++) {
    let temp = {}
    temp.xValue = words[i].ngram
    temp.yValue = words[i].count
    array.push(temp)
  }

  return array
}

export function nextTenWords(index) {
  let words = makeWordsData(allWords, index)
  return {
    type: MORE_REP_WORDS,
    words
  }
}

export function previousTenWords(index) {
  let words = makeWordsData(allWords, index)
  return {
    type: LESS_REP_WORDS,
    words
  }
}