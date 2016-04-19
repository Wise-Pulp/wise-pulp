import fetch from 'isomorphic-fetch'
import  { getContributorData } from './actionContributor'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const IS_FETCHING = 'IS_FETCHING'
export const INCREASE_PROGRESS = 'INCREASE_PROGRESS'
export const GET_REP_INFO = 'GET_REP_INFO'
export const STOP_PROGRESS = 'STOP_PROGRESS'
export const RECEIVE_REP_WORDS = 'RECEIVE_REP_WORDS'
export const MORE_REP_WORDS = 'MORE_REP_WORDS'
export const LESS_REP_WORDS = 'LESS_REP_WORDS'

let allWords = []

function changeFetching () {
  return {
    type: IS_FETCHING
  }
}

export function receiveRepresentatives(json) {
  return {
    type: RECEIVE_REPRESENTATIVES,
    representatives: json.objects
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
    dispatch(changeFetching())
  	return fetch('/api/representatives/' + zipcode)
  		.then(response => response.json())
  		.then(json => dispatch(receiveRepresentatives(json)))
  } 
}

export function increaseProgress () {
  return {
    type: INCREASE_PROGRESS
  }
}

export function stopProgress() {
  return {
    type: STOP_PROGRESS
  }
}

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