import d3 from 'd3'
import Chart from '../../node_modules/d3act/lib/components/Chart'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepWords, nextTenWords, previousTenWords } from '../actions/index'

export default class RepWords extends Component {
  constructor(props) {
    super(props)
    this.moreWords = this.moreWords.bind(this)
    this.lessWords = this.lessWords.bind(this)
  }

  moreWords() {
    const { dispatch, index, words } = this.props
    if (index + 10 > words.length ) {
      dispatch(nextTenWords(words.length))
    } else {
      dispatch(nextTenWords(index))
    }
  }

  lessWords() {
    const { dispatch, index, words } = this.props
    if (index - 10 < 0) {
      dispatch(previousTenWords(0))
    } else {
      dispatch(previousTenWords(index))
    }
  }

  componentDidMount() {
    const { params, representatives, dispatch } = this.props
    representatives.map(function(rep) {
      if (rep.person.id === JSON.parse(params.id)) {
        dispatch(getRepWords(rep.person.bioguideid))
      }
    }.bind(this))
  }

  render() {    
    const { data } = this.props
    return <div>
      { data ? <div><Chart type={'bar'}
                      width={800}
                      height={300}
                      showTooltips={false}
                      margin={{ top: 40, right: 40, bottom: 40, left: 50 }}
                      data={data}
                       /> 
                <button onClick={this.lessWords}>Previous 10 Words</button>
                <button onClick={this.moreWords}>Next 10 Words</button>
                </div>
                       : null }

    </div>
  }
}

function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const data = state.RepWords.words
  const index = state.RepWords.index
  console.log(index)
  return {
    representatives,
    data,
    index
  }
}

export default connect(mapStateToProps)(RepWords)