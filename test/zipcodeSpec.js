import React from 'react';
import Map from 'immutable'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai';


xdescribe('Loading spinner', () => {

  it('Should not display if isFetching is false', () => {
    const isFetching = false;
    const component = renderIntoDocument(<Spinner connected={isFetching} />)
    const progressLabel = findRenderedDOMComponentWithTag(component, 'div')

    expect(progressLabel.style.display).to.equal('none');
  });

  it('Should display spinner if isFetching is true', () => {
    const isFetching = true;
    const component = renderIntoDocument(<Spinner connected={isFetching} />)
    const progressLabel = findRenderedDOMComponentWithTag(component, 'div')

    expect(progressLabel.style.display).to.equal('block');
  });

});