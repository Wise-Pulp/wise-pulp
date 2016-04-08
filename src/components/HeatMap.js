import React, { Component } from 'react'
import d3 from 'd3'
import { connect } from 'react-redux'

import { GET_HEAT_MAP, getHeatMapData } from '../actions/actionHeatMap'


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

  // componentWillUpdate() {
  //   console.log('ay papi')
  //   d3.json('./ca.txt', (error, ch) => {
  //     const center = d3.geo.centroid(ch)
  //     this.props.dispatch(getHeatMapData(ch, center))
  //   })
  // }

  componentDidMount() {
    console.log('mammamia')
    d3.json('./ca.txt', (error, ch) => {
      const center = d3.geo.centroid(ch)
      this.props.dispatch(getHeatMapData(ch, center))
    })
  }
  render() {
    const rateById = d3.map();
    const quantize = d3.scale.quantize()
      .domain([25, 50])
      .range(d3.range(9).map(function(i) { return 'q' + i + '-9'}))

    const width = 960;
    const height = 600;
     
    const projection = d3.geo.albers()
      .scale(3000)
      //.rotate([30, 0])
      .translate([1500, 350])

    const path = d3.geo.path()
      .projection(projection)

    console.log(this.props.mapData)
    return (
      <div className="front_data">
      <h2 className="heat_map_heading">Voter Turnout in Your State</h2>
      {this.props.mapData ? 
      <svg width={width} height={height}>
        <g>
          {this.props.mapData.features.map(function(county, i) {
            return <path d={path(county)} 
                         className={quantize(counties[county.properties.id])}
                         key={i}
                />
          })}
        </g> 
      </svg> : <svg width={width} height={height}/> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const mapData = state.HeatMap.map
  const center = state.HeatMap.center
  console.log(mapData)
  return {
    mapData,
    center
  }
}

export default connect(mapStateToProps)(HeatMap)