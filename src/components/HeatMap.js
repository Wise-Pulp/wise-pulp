import React, { Component } from 'react'
import d3 from 'd3'



var counties = {
  6001: 35.36,
  6003: 53.30,
  6005: 49.20,
  6007: 37.84,
  6009: 45.39,
  6011: 35.96,
  6013: 36.04,
  6015: 40.17,
  6017: 46.40,
  6019: 28.57,
  6021: 33.79,
  6023: 36.80,
  6025: 22.64,
  6027: 40.91,
  6029: 27.31,
  6031: 29.39,
  6033: 36.81,
  6035: 40.60,
  6037: 24.91,
  6039: 31.83,
  6041: 50.61,
  6043: 43.79,
  6045: 38.84,
  6047: 25.57,
  6049: 41.97,
  6051: 32.75,
  6053: 31.85,
  6055: 42.35,
  6057: 51.65,
  6059: 32.61,
  6061: 44.51,
  6063: 47.34,
  6065: 25.66,
  6067: 34.42,
  6069: 40.57,
  6071: 23.03,
  6073: 32.42,
  6075: 36.97,
  6077: 27.81,
  6079: 43.29,
  6081: 33.51,
  6083: 40.58,
  6085: 34.90,
  6087: 39.42,
  6089: 43.42,
  6091: 65.03,
  6093: 40.52,
  6095: 32.14,
  6097: 42.90,
  6099: 28.38,
  6101: 35.18,
  6103: 36.11,
  6105: 36.10,
  6107: 24.55,
  6109: 43.93,
  6111: 37.59,
  6113: 32.97,
  6115: 26.58
}
export default class HeatMap extends Component {
  render() {
    return (
      <div className="container splash_data">
      <h2>Voter Turn Out In Your Area (County Name?)</h2>
      <div className="col-md-4">
      <img className="heat_map" src="https://pbs.twimg.com/media/CS82xWSWIAAdBmZ.png:large" />
      </div>
      <div className="col-md-4 col-md-offset-4">
        <p className="data_info">Would it be very difficult to somehow have a short description of each data-viz and put it here? If so, we can get rid of this paragraph.<br />
          Otherwise we could add so many paragraphs!<br />
          Visualize all of the data!!!!!</p>
      </div>
      </div>
      );
  }
}



const rateById = d3.map();


const quantize = d3.scale.quantize()
  .domain([25, 50])
  .range(d3.range(9).map(function(i) { return "q" + i + "-9"}))

const width = 960;
const height = 600;
 
const projection = d3.geo.albersUsa()
  .scale(1280)
  .translate([width / 2, height / 2])

const path = d3.geo.path()
  .projection(projection)

class Counties extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <g>
      {this.props.ch.features.map(function(county) {
        return <path d={path(county)} 
                     className={quantize(counties[county.properties.id])}
            />
      })}
    </g>
    )
  }
}

const Map = ({ch}) => {

  return (
    <svg width={width} height={height}>
      <Counties ch={ch}/>
    </svg>
  );
};
 
d3.json('california.txt', (error, ch) => {
  ReactDOM.render(
    <Map ch={ch} />,
    document.body
  );
});