export const RECEIVE_REP_WORDS = 'RECEIVE_REP_WORDS'
export const MORE_REP_WORDS    = 'MORE_REP_WORDS'
export const LESS_REP_WORDS    = 'LESS_REP_WORDS'
 

export function getRepWords(rep, testing) {
  let url = '/api/words/'
  if (testing) {
    url = 'https://localhost:3500/api/words/'
  }
  return dispatch => {
    return fetch(url + rep)
      .then(response => response.json())
      .then(json => dispatch(receiveRepWords(json)))
  }
}

export function receiveRepWords(payload) {
  return {
    type: RECEIVE_REP_WORDS,
    words: makeWordsData(payload)
  }
}

export function makeWordsData(words) {
  return words.map((word) => {
    let temp = {}
    temp.xValue = word.ngram
    temp.yValue = word.count
    return temp
  })
}

export function nextTenWords() {
  return {
    type: MORE_REP_WORDS
  }
}

export function previousTenWords() {
  return {
    type: LESS_REP_WORDS
  }
}