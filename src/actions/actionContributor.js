export const GET_CONTRIBUTOR_DATA = 'GET_CONTRIBUTOR_DATA'
export const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'


export function getContributorData(zipcode) {
  let date = Date.parse('01/01/16')
  let hello = '/api/data/CandidateSummary/' + zipcode + '/' + date
  return dispatch => {
    return fetch(hello)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        dispatch(receiveContributorData(json))
    })
  }
  // let data = createData()
  // return dispatch => {
  //   dispatch(receiveContributorData(data))
  // }
}

export function receiveContributorData(data) {
  console.log(data)
	return {
		type: GET_CONTRIBUTOR_DATA,
		data
	}
}

export function setGraphType() {
  return {
    type: SET_GRAPH_TYPE
  }
}

function createData() {
	let n = 6 // number of layers
  let m = 3 // number of bars

  let layers = [
    [{x: 0, y: 3410}, {x:1, y: 8301}, {x: 2, y: 23152.81}],
    [{x: 0, y: 153550}, {x: 1, y: 50550}, {x: 2, y: 377748}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 0}, {x: 1, y: 35748.35}, {x: 2, y: 279609.1}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 156960}, {x: 1, y: 94599.35}, {x: 2, y: 680509.91}]
  ]
  let stack = d3.layout.stack()

  let theseLayers = stack(layers)
  return {
    m: m,
    n: n,
    layers: theseLayers,
  }
}

