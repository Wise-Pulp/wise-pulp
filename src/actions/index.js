import fetch from 'isomorphic-fetch'
import nock from 'nock'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const IS_FETCHING = 'IS_FETCHING'
export const SELECT_REPRESENTATIVE = 'SELECT_REPRESENTATIVE'
export const INCREASE_PROGRESS = 'INCREASE_PROGRESS'


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