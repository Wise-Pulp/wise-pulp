import d3 from 'd3'
import c3 from 'c3'
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

    create(data) {
    const chart  = c3.generate({
      bindto: '#contribution_chart',
      data: {
        columns: ['rjaljflakjf', 1, 4, 52, 6, 7474],
        types: {
          data1: 'bar',
          data2: 'bar',
          data3: 'bar',
          data4: 'bar',
          data5: 'bar',
          data6: 'bar'
        }
      }
    });
    
  }

  componentDidMount() {
    this.create(this.props.contributions)
  }

    render() {
        const grouped = 'grouped'
        const stacked = 'stacked'
        const { contributions } = this.props
        console.log('this.props from contributionVis', this.props)
        return <div>
      { this.props.contributions ? 
        <div id="contribution_chart"></div>
        : <div>Loading...</div> }
      </div>
    }
}

function mapStateToProps(state) {
  console.log('state from ContributorVisualization', state)
  const m = state.ContributorVisualization.m
  const n = state.ContributorVisualization.n
  const layers = state.ContributorVisualization.layers
  const grouped = state.ContributorVisualization.grouped
  const contributions = state.ContributorVisualization.contributions
  console.log('this should be contributor data from contributorViz', contributions)
  return {
    m,
    n,
    layers,
    grouped,
    contributions
  }
}

export default connect(mapStateToProps)(ContributorVisualization)