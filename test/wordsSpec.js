import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import { expect }                   from 'chai'
import sinon                        from 'sinon'
import React                        from 'React'
import { mount, shallow, render }   from 'enzyme'

import * as actions                 from '../src/actions/actionRepWords'
import repWords                     from '../src/reducers/reducerRepWords'
import { RepWords }                 from '../src/containers/Representatives/RepWords'
import Chart                        from '../node_modules/d3act/lib/components/Chart'


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const words = [{ngram: 'h3llo', count: 100}, 
               {ngram: 'goodbye', count: 99}, 
               {ngram: 'mama', count: 1000}, 
               {ngram: 'mia', count: 25}, 
               {ngram: 'pizza', count: 223}, 
               {ngram: 'ria', count: 34}, 
               {ngram: 'love', count: 18}, 
               {ngram: 'games', count: 500}, 
               {ngram: 'touch', count: 59}, 
               {ngram: 'hugs', count: 88}]

const newWords = [{ xValue: 'h3llo', yValue: 100 },
                  { xValue: 'goodbye', yValue: 99 },
                  { xValue: 'mama', yValue: 1000 },
                  { xValue: 'mia', yValue: 25 },
                  { xValue: 'pizza', yValue: 223 },
                  { xValue: 'ria', yValue: 34 },
                  { xValue: 'love', yValue: 18 },
                  { xValue: 'games', yValue: 500 },
                  { xValue: 'touch', yValue: 59 },
                  { xValue: 'hugs', yValue: 88 }]

describe('Get Rep Words', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_REP_WORDS when fetching words is done', () => {
    nock('https://localhost:3500')
      .get('/api/words/123')
      .reply(200, words)

    const expectedActions = [{ type: actions.RECEIVE_REP_WORDS, 
                               words: newWords }]

    const store = mockStore({ words: null })

    return store.dispatch(actions.getRepWords(123, true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})

describe('Rep Words Reducer', () => {

  let index = 10
  let otherWords = newWords.slice()
  let x = 10
  while ( x > 0 ) {
    otherWords.unshift(' ')
    x--
  }

  it('Reducer Handles Initial State', () => {
    expect(
      repWords(undefined, {}))
      .to.deep.equal({words: null, index: 10, display: null})
  })

  it('should handle RECEIVE_REP_WORDS', () => {
    expect(
      repWords({words: null, index}, {type: actions.RECEIVE_REP_WORDS, 
                            words: newWords}))
      .to.deep.equal({words: newWords, display: newWords, index})
  })

  it('should handle MORE_REP_WORDS', () => {
    expect(
      repWords({words: otherWords, display: [], index: 20}, {type: actions.MORE_REP_WORDS}))
      .to.deep.equal({words: otherWords, display: newWords, index: 20})

  })
  it('should handle LESS_REP_WORDS', () => {
    x = 10
    while (x > 0) {
      otherWords.shift()
      x--
    }

    expect(
      repWords({words: otherWords, index: 20, display: []}, {type: actions.LESS_REP_WORDS}))
      .to.deep.equal({words: newWords, index: 10, display: otherWords})
  })

  it('should not set index below 10', () => {
    expect(repWords({index: 10, display: [], words: newWords}, {type: actions.LESS_REP_WORDS}))
    .to.deep.equal({index: 10, display: newWords, words: newWords})
  })

  it('should not set index above words.length', () => {
    expect(repWords({index: newWords.length, display: [], words: newWords}, {type: actions.MORE_REP_WORDS}))
    .to.deep.equal({index: newWords.length, display: newWords, words: newWords})
  })
})


describe('Rep Words Buttons', () => {

  function mockData() {
    return {hello: 'world'}
  }
  const data      = mockData()
  let dispatch    = sinon.spy()
  let lessWords   = sinon.spy(RepWords.prototype, 'lessWords')
  let moreWords   = sinon.spy(RepWords.prototype, 'moreWords')
  let wrapper     = shallow(<RepWords data={data} dispatch={dispatch} />)

  afterEach(() => {
    lessWords.restore()
    moreWords.restore()
  })

  it('load', () => {
    expect(wrapper.find('.lessWords')).to.have.length(1)
    expect(wrapper.find('.moreWords')).to.have.length(1)
  })

  it('process clicks', () => {

    wrapper.find('.lessWords').simulate('click')
    expect(lessWords.calledOnce).to.equal(true)
    expect(dispatch.calledOnce).to.equal(true)

    wrapper.find('.moreWords').simulate('click')
    expect(moreWords.calledOnce).to.equal(true)
    expect(dispatch.calledTwice).to.equal(true)
  })


  
})

describe('Rep Words Component', () => {

  let random = Math.floor(Math.random() * 1000)
  function mockRepresentatives() {
    return [{person: {
              id: random
              }
            }]
  }
  function mockParams() {
    return {id: random}
  }
  function mockData() {
    return {hello: 'world'}
  }
  const data            = mockData()
  let dispatch          = sinon.spy()
  const representatives = mockRepresentatives()
  const params          = mockParams()
  sinon.spy(RepWords.prototype, 'componentDidMount')
  let wrapper           = mount(<RepWords representatives={representatives} params={params} dispatch={dispatch} />)
  
  it('calls componentDidMount on mount', () => {
    expect(RepWords.prototype.componentDidMount.calledOnce).to.equal(true)
  })

  it('calls dispatch on componentDidMount', () => {
    expect(dispatch.calledOnce).to.equal(true)
  })

  it('does not load Chart until there is data', () => {
    expect(wrapper.contains(Chart)).to.equal(false)
  })

  it('loads Chart when there is data', () => {
    wrapper = shallow(<RepWords data={data} />)
    expect(wrapper.contains(Chart)).to.equal(true)
  })

})
















