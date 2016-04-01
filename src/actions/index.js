import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const IS_FETCHING = 'IS_FETCHING'
export const SELECT_REPRESENTATIVE = 'SELECT_REPRESENTATIVE'
export const INCREASE_PROGRESS = 'INCREASE_PROGRESS'
export const GET_REP_INFO = 'GET_REP_INFO'
export const STOP_PROGRESS = 'STOP_PROGRESS'

function changeFetching () {
  return {
    type: IS_FETCHING
  }
}

export function setRepresentative(rep) {
  return {
    type: SELECT_REPRESENTATIVE,
    rep
  }
}

export function receiveRepInfo(json) {
  return {
    type: GET_REP_INFO,
    info: json
  }
}

export function getRepInfo(rep) {
  return dispatch => {
    return axios('http://en.wikipedia.org/w/api.php?format=json&action=query&titles=India&prop=revisions&rvprop=content&callback=?')
      .then(response => response.json())
      .then(json => dispatch(receiveRepInfo(json)))
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