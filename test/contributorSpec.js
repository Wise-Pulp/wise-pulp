import React                        from 'react'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
}                                   from 'react-addons-test-utils'
import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import {expect}                     from 'chai'
import { GET_CONTRIBUTOR_DATA,
         SET_GRAPH_TYPE,
         setContributorData,
         setGraphType }             from '../src/actions/actionContributor'
import contributorData              from '../src/reducers/reducerContributor'


xdescribe('Contributor Data Ecosystem', () => {

  it('should create an action to change the graph type', () => {
    const expectedAction = {
      type: SET_GRAPH_TYPE
    }
    expect(setGraphType()).to.deep.equal(expectedAction)
  })

  it('should return the initial state', () => {
    expect(
      contributorData(undefined, {})
      ).to.deep.equal(
        {
        grouped: false,
        m: null,
        n: null,
        layers: null
        }
      )
  })

  it('Should handle SET_GRAPH_TYPE', () => {
    expect(
      contributorData([], {
        type: SET_GRAPH_TYPE,
      })
    ).to.deep.equal({
      grouped: true
      }
    )
  })

  xit('Should create an action to set the contributor data', () => {
    const data = {
      m: 4,
      n: 3,
      layers: 12
    }
    const expectedAction = {
      type: GET_CONTRIBUTOR_DATA,
      data: data
    }
    expect(
      setContributorData().to.deep.equal({
      data: {
        m: 4,
        n: 3,
        layers: 12
      },
      type: GET_CONTRIBUTOR_DATA
      
      })
    )
  })

  it('Should handle GET_CONTRIBUTOR_DATA', () => {
    expect(
      contributorData([], {
        type: GET_CONTRIBUTOR_DATA,
        data: data
      })
    )
  })
})





