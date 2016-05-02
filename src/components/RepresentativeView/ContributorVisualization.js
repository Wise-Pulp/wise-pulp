import c3 from 'c3'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from '../../../node_modules/d3act/lib/components/Chart'
import Visualization from './Graph'
import { setGraphType } from '../../actions/actionContributor'

export class ContributorVisualization extends Component {


  handleChange(value) {
    this.props.dispatch(setGraphType())
  }

  create(data) {
    const chart  = c3.generate({
      bindto: '#contribution_chart',
      data: {
        columns: [
          this.props.contributions[0],
          this.props.contributions[1],
          this.props.contributions[2],
          this.props.contributions[3],
          this.props.contributions[4],
          this.props.contributions[5]
        ],
        types: {
          "individual > $200": 'bar',
          "individual < $200": 'bar',
          "other committee": 'bar',
          "party committee": 'bar',
          "total": 'bar',
          "Net Gains": 'bar'
        }
      }
    })
    
  }

  componentDidMount() {
    this.create(this.props.contributions)
  }

  render() {
    const { contributions } = this.props
    return <div>
      { this.props.contributions ? 
        <div id="contribution_chart"></div>
        : <div>Loading...</div> }
      </div>
  }
}

function mapStateToProps(state) {
  const contributions = state.ContributorVisualization.contributions
  console.log(contributions)
  return {
    contributions
  }
}

export default connect(mapStateToProps)(ContributorVisualization)