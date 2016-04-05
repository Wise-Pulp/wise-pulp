import fetch from 'isomorphic-fetch'
import  { setContributorData } from './actionContributor'

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
  		.then(json => {
        dispatch(receiveRepresentatives(json))
        let firstRep = json.objects[0].person.lastname + ', ' + json.objects[0].person.firstname
        let secondRep = json.objects[1].person.lastname + ', ' + json.objects[1].person.firstname
        let thirdRep = json.objects[2].person.lastname + ', ' + json.objects[2].person.firstname
        dispatch(setContributorData(firstRep, secondRep, thirdRep))
      })
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