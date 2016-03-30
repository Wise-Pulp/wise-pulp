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
          setRepresentative } from '../src/actions/index'
import representativeList from '../src/reducers/reducerProfile'



describe('Select Representative', () => {

  it('should create an action to select a representative', () => {
    const id = '12345'
    const expectedAction = {
      type: SELECT_REPRESENTATIVE,
      id
    }
    console.log(setRepresentative(id) === expectedAction)
    expect(setRepresentative(id)).to.deep.equal(expectedAction);
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

  it('should handle SELECT_REPRESENTATIVE')
    expect(
      representativeList([], {
        type: SELECT_REPRESENTATIVE,
        representative: 'hello'
      })
    ).to.deep.equal(
      {
        representative: 'hello'
      }
    )
});