import fetch from 'isomorphic-fetch'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'

function receiveRepresentatives(json) {
  return {
    type: RECEIVE_REPRESENTATIVES,
    representatives: json.objects
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
  	return fetch('/api/representative/' + zipcode)
  		.then(response => response.json())
  		.then(json => dispatch(receiveRepresentatives(json))) 
  }
}