import fetch from 'isomorphic-fetch'

export const GET_CONTRIBUTOR_DATA = 'GET_CONTRIBUTOR_DATA'
export const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'

function processCandidate(candidateData) {
  const data = [];
  console.log('data from processCandidate', candidateData)
  //[{ can_nam: 'etc'}, {can_nam: 'etc2'}]
  var ind_uni_con = ['individual < $200', candidateData[0].ind_uni_con],
      ind_ite_con = ['individual > $200', candidateData[0].ind_ite_con],
      oth_com_con = ['other committee', candidateData[0].oth_com_con],
      par_com_con = ['party committee', candidateData[0].par_com_con],
      total = ['total', candidateData[0].tot_con],
      netprofit = ['Net Gains', (candidateData[0].cas_on_han_clo_of_per - candidateData[0].cas_on_han_beg_of_per)];

      data.push( ind_ite_con, ind_uni_con, oth_com_con, par_com_con, total, netprofit);
    return data;
  }

export function getContributorData(zipcode) {
  return dispatch => {
    return fetch('/api/data/CandidateSummary/' + zipcode + '/2016')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveContributorData(processCandidate(json)))
      })
  }
}

export function receiveContributorData(data) {
  createData(data)
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

function createData(data) {
  console.log('this should get data from receiveContributorData', data)
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
    data
  }
}

