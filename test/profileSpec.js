import React from 'react';
// Do we need to import immutable as well????????
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import { RECEIVE_REPRESENTATIVES,
          receiveRepresentatives,
          getRepresentatives,
          getZipCode } from '../src/actions/index'
import {RepresentativeList} from '../src/components/RepresentativeList'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('API Calls', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  xit('creates RECEIVE_REPRESENTATIVES when fetching representatives has been done', (done) => {
    nock('http://localhost')
      .get('/api/representatives')
      .reply('200', { objects: { name: 'Barbara Lee'} } )

    const expectedActions = [
      { type: RECEIVE_REPRESENTATIVES, representatives: { objects: { name: 'Barbara Lee'} } }
    ]

    const store = mockStore({}, expectedActions, done)
    store.dispatch(getRepresentatives(94611))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0].type).toEqual(receiveRepresentatives())
        
        done()
      })
  })
})


describe('Representative List', () => {

  // it('should receive the junior senator from California', () => {

    

  // });


  // it('should not load without representative data', () => {
  //   const properties = '';
  //   const component = renderIntoDocument(<RepresentativeList representatives={properties} />);
  //   const ul = findRenderedDOMComponentWithTag(component, 'ul');

  //   expect(ul.innerHTML).to.equal({properties});
  // });

});