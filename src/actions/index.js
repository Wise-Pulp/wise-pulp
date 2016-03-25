import fetch from 'isomorphic-fetch'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'

function receiveRepresentatives(representatives, state) {
	var storage = []
	for (var i = 0; i < representatives.objects.length; i++) {
		if(representatives.objects[i].state === state) {
			storage.push(representatives.objects[i])
		}
	}
  return {
    type: RECEIVE_REPRESENTATIVES,
    representatives: storage
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
  	return fetch('/api/representative/:zipcode')
  		.then(response => response.json())
  		.then(json => dispatch(receiveRepresentatives(json)))	
  }
}