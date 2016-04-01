import d3 from 'd3'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import Chart from '../../node_modules/d3act/lib/components/Chart'
import Visualization from './Graph'
import { setGraphType } from '../actions/actionContributor'

export class ContributorVisualization extends Component {

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