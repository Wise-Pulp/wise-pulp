import fetch from 'isomorphic-fetch'
import nock from 'nock'
const API_KEY = 'AIzaSyD2uEW__R9AOm1JrooaddNSZM1EdN6KhAc'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const IS_FETCHING = 'IS_FETCHING'

function changeFetching () {
  return {
    type: IS_FETCHING
  }
}

export function getZipCode() {
  window.navigator.geolocation.getCurrentPosition(function(pos){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + ' &result_type=postal_code&key=' + API_KEY)
      .then(response => response.json())
      .then(location => getRepresentatives(location.results[0].address_components[0].short_name))
  })
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