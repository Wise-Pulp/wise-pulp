export const GET_CONTRIBUTOR_DATA = 'GET_CONTRIBUTOR_DATA'
export const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'

export function setContributorData() {
	var data = createData()
  console.log('whatup')
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
	let n = 3 // number of layers
  let m = 4 // number of samples per layer
  let stack = d3.layout.stack()
  let layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); }))
  function bumpLayer(n, o) {

      function bump(a) {
        let x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (let i = 0; i < n; i++) {
          let w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

  let a = [], i;
  for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
  for (i = 0; i < 5; ++i) bump(a);
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }

  return {
  	m: m,
  	n: n,
  	layers: layers,
  }
}