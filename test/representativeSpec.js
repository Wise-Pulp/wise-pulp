import React                        from 'react'
import nock                         from 'nock'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
}                                   from 'react-addons-test-utils'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import { expect }                   from 'chai'
import { RECEIVE_REPRESENTATIVES,
          GET_REP_INFO,
          IS_FETCHING,
          getRepresentatives }      from '../src/actions/actionRepresentatives'
import representativeList           from '../src/reducers/reducerRepresentatives'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Get Representatives', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_REPRESENTATIVES when fetching reps is done', () => {
    nock('http://localhost:3500')
      .get('/api/representatives/94709')
      .reply(200, { objects: { id: 123456 } } )

    const expectedActions = [{ type: IS_FETCHING}, { 
                                type: RECEIVE_REPRESENTATIVES,
                                payload: {
                                  id: 123456
                                }
                             }] 
    const store = mockStore({ representatives: [] })

    return store.dispatch(getRepresentatives(94709))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})

xdescribe('Select Representative', () => {

  it('should create an action to select a representative', () => {
    const rep = '12345'
    const expectedAction = {
      type: SELECT_REPRESENTATIVE,
      rep
    }
    expect(setRepresentative(rep)).to.deep.equal(expectedAction)
  })

  it('should return the initial state', () => {
    expect(
      representativeList(undefined, {})
      ).to.deep.equal({
        representatives: [],
        isFetching: false,
        representative: null
      })
  })

  it('should handle SELECT_REPRESENTATIVE', () => {
    expect(
      representativeList([], {
        type: SELECT_REPRESENTATIVE,
        rep: 'hello'
      })
    ).to.deep.equal(
      {
        representative: 'hello'
      }
    )
  })

  xit('creates GET_REP_INFO when fetching rep info is done', (done) => {
    nock('https://en.wikipedia.org')
      .get('/w/api.php')
      .query(true)
      .reply(200, { body: { info: 'data' }})

    const expectedActions = [{ type: GET_REP_INFO, info: { body: {info: 'data'} }}]

    const store = mockStore({ body: {} })

    store.dispatch(getRepInfo())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .then(done)
      .catch(done)
  })
})