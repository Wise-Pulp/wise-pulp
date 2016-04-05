import React from 'react';
import Map from 'immutable'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai';
import { INCREASE_PROGRESS } from '../src/actions/index'
import Spinner from '../src/components/Spinner'
import updateSpinnerProgress from '../src/reducers/reducerSpinner'
import Profile from '../src/containers/Profile'


describe('Loading spinner', () => {

  it('should return an initial state of 0 for progress', () => {
    expect(
      updateSpinnerProgress(undefined, {})
      ).to.deep.equal(
        {
          progress: 0
        }
      )
  });

  it('should increase progress by 10 when the action is INCREASE_PROGRESS', () => {
    const progress = 0;
    expect(
      updateSpinnerProgress({progress}, INCREASE_PROGRESS)
    ).to.deep.equal(
      {
        progress: 10
      }
    )
  });

  // it('Should not display if isFetching is false', () => {
  //   const isFetching = false;
  //   const component = renderIntoDocument(<Spinner connected={isFetching} />)
  //   const progressLabel = scryRenderedDOMComponentsWithTag(component, 'div')

  //   expect(progressLabel.style.display).to.equal('none');
  // });

  // it('Should display spinner if isFetching is true', () => {
  //   const isFetching = true;
  //   const component = renderIntoDocument(<Spinner connected={isFetching} />)
  //   const progressLabel = scryRenderedDOMComponentsWithTag(component, 'div')

  //   expect(progressLabel.style.display).to.equal('block');
  // });

});