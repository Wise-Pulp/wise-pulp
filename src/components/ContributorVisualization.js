import d3 from 'd3'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import Chart from '../../node_modules/d3act/lib/components/Chart'
import Visualization from './Graph'
import { setGraphType } from '../actions/actionContributor'

export class ContributorVisualization extends Component {

    constructor(props) {
        super(props);
        var n = 3 // number of layers
        let m = 4 // number of samples per layer
        let stack = d3.layout.stack()
        let layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); }))
        function bumpLayer(n, o) {

            function bump(a) {
              var x = 1 / (.1 + Math.random()),
                  y = 2 * Math.random() - .5,
                  z = 10 / (.1 + Math.random());
              for (var i = 0; i < n; i++) {
                var w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
              }
            }

        var a = [], i;
        for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
        for (i = 0; i < 5; ++i) bump(a);
        return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
        }
    }

    handleChange(value) {
      this.props.dispatch(setGraphType())
    }

    render() {
        const grouped = 'grouped'
        const stacked = 'stacked'
        return (
            <div>
              { this.props.m ? 
                <div>
                   <form>
                      <label><input type="radio" name="mode" value={grouped} onChange={this.handleChange.bind(this, grouped)}/> Grouped</label>
                      <label><input defaultChecked={true} type="radio" name="mode" value={stacked} onChange={this.handleChange.bind(this, stacked)} /> Stacked</label>
                   </form>
                  <Chart
                      type={'custom'}
                      customChart={Visualization}
                      data={this.props} /> 
                  </div>
                : <div>Loading...</div> }
            </div>
        );
    }
}

function mapStateToProps(state) {
	console.log(state)
  const m = state.ContributorVisualization.m
  const n = state.ContributorVisualization.n
  const layers = state.ContributorVisualization.layers
  const grouped = state.ContributorVisualization.grouped

  return {
    m,
    n,
    layers,
    grouped
  }
}

export default connect(mapStateToProps)(ContributorVisualization)