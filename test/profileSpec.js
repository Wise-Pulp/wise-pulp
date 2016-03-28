import React from 'react';
// Do we need to import immutable as well????????
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai';
import { RECEIVE_REPRESENTATIVES,
          receiveRepresentatives,
          getRepresentatives } from '../src/actions/index'
import {RepresentativeList} from '../src/components/RepresentativeList'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/index'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', (done) => {
    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: { todos: ['do something'] }})

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
    ]
    const store = mockStore({ todos: [] })

    store.dispatch(actions.fetchTodos())
      .then(() => {
        const actions = store.getActions()

        expect(actions[0].type).toEqual(types.FETCH_TODOS_REQUEST)

        done()
      })
  })
})

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_REPRESENTATIVES when fetching representatives has been done', (done) => {
    nock('localhost:3500/api/representative')
      .get('/94611')
      .reply(200, { representatives: [{objects: {id: 3949482, name: 'Barbara Lee' } }] })

    const expectedActions = [
      { type: RECEIVE_REPRESENTATIVES, representatives: [{objects: {id: 3949482, name: 'Barbara Lee' } }] }
    ]
    const store = mockStore({ representatives: [] })

    store.dispatch(getRepresentatives())
      .then(() => {
        const actions = store.getActions()

        expect(actions[0].type).toEqual(types.RECEIVE_REPRESENTATIVES)

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