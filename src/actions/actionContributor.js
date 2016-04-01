export const GET_CONTRIBUTOR_DATA = 'GET_CONTRIBUTOR_DATA'
export const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'

export function setContributorData() {
	var data = createData()
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
  // layers = [ [ { x: 0, y: 3410, y0: 0 },
  //   { x: 1, y: 153550, y0: 0 },
  //   { x: 2, y: 0, y0: },
  //   { x: 3, y: 0, y0: },
  //   { x: 4, y: 0, y0: },
  //   { x: 5, y: 156960, y0: } ],


  let layers = [
    [{x: 0, y: 3410, y0: 0}, {x:1, y: 8301, y0: 0}, {x: 2, y: 23152.81, y0: 0}],
    [{x: 0, y: 153550, y0: 3410}, {x: 1, y: 50550, y0: 8301}, {x: 2, y: 377748, y0: 23152.81}],
    [{x: 0, y: 0, y0: 153550}, {x: 1, y: 0, y0: 50550}, {x: 2, y: 0, y0: 377748}],
    [{x: 0, y: 0, y0: 0}, {x: 1, y: 35748.35, y0: 0}, {x: 2, y: 279609.1, y0: 0}],
    [{x: 0, y: 0, y0: 0}, {x: 1, y: 0, y0: 35748.35}, {x: 2, y: 0, y0: 279609.1}],
    [{x: 0, y: 156960, y0: 0}, {x: 1, y: 94599.35, y0: 0}, {x: 2, y: 680509.91, y0: 0}]
  ]

  let stack = d3.layout.stack()
  
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

    //console.log('this is a', a)
    //a are the y values
    //they become the y0 for the next array
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }
 // console.log('this is bumplayer', bumpLayer(m, .1))

  //let layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); }))
  console.log(layers)
  return {
    m: m,
    n: n,
    layers: layers,
  }
}

