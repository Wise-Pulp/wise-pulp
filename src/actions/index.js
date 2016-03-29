import fetch from 'isomorphic-fetch'

export const RECEIVE_REPRESENTATIVES = 'RECEIVE_REPRESENTATIVES'
export const IS_FETCHING = 'IS_FETCHING'

function changeFetching () {
  return {
    type: IS_FETCHING
  }
}

function receiveRepresentatives(json) {
  return {
    type: RECEIVE_REPRESENTATIVES,
    representatives: json.objects
  }
}

export function getRepresentatives (zipcode) {
  return dispatch => {
    dispatch(changeFetching())
  	return fetch('/api/representative/' + zipcode)
  		.then(response => response.json())
  		.then(json => dispatch(receiveRepresentatives(json))) 
  }
}

export function increaseProgress () {
  return setInterval(()=> {
    return this.props.progress += 10
  }, 400)
}