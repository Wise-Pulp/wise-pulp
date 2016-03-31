import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai';
import { SELECT_REPRESENTATIVE,
          GET_REP_INFO,
          getRepInfo,
          setRepresentative } from '../src/actions/index'
import representativeList from '../src/reducers/reducerProfile'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Select Representative', () => {

  it('should create an action to select a representative', () => {
    const rep = '12345'
    const expectedAction = {
      type: SELECT_REPRESENTATIVE,
      rep
    }
    expect(setRepresentative(rep)).to.deep.equal(expectedAction);
  });

  it('should return the initial state', () => {
    expect(
      representativeList(undefined, {})
      ).to.deep.equal(
        {
          representatives: [],
          isFetching: false,
          representative: null
        }
      )
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

    it('creates REP_INFO when fetching rep info is done', (done) => {
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
});