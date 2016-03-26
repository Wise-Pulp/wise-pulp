import fetch from 'isomorphic-fetch'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'

function receiveRepresentatives(json) {
  console.log(json)
  return {
    type: RECEIVE_REPRESENTATIVES,
    representatives: storage
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
  	return fetch('/api/representative/' + zipcode)
  		.then(response => response.json())
  		.then(json => dispatch(receiveRepresentatives(json.objects))) 
  }
}