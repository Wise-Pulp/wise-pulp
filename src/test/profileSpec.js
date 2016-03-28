import React from 'react';
// Do we need to import immutable as well????????
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {RepresentativeList} from '../components/RepresentativeList'



describe('Representative List' () =>{

  it('should not load without representative data', () => {
    const component = renderIntoDocument(<RepresentativeList representatives={}>);
    const ul = findRenderedDOMComponentWithTag(component, 'ul');

    expect(ul.innerHTML).to.equal(undefined);
  });

});