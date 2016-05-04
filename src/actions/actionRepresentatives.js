import fetch from 'isomorphic-fetch'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const GET_REP_INFO = 'GET_REP_INFO'
export const IS_FETCHING = 'IS_FETCHING'
export const INCREASE_PROGRESS = 'INCREASE_PROGRESS'
export const STOP_PROGRESS = 'STOP_PROGRESS'

export function changeFetching () {
  return {
    type: IS_FETCHING
  }
}

export function receiveRepresentatives(json) {
  return {
    type: RECEIVE_REPRESENTATIVES,
    payload: json.objects
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
    dispatch(changeFetching())
  	return fetch('https://localhost:3500/api/representatives/' + zipcode)
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