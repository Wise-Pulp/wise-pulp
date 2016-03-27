import React from 'react';
// Do we need to import immutable as well????????
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {RepresentativeList} from '../src/components/RepresentativeList'



describe('Representative List', () => {

  it('should not load without representative data', () => {
    const properties = '';
    const component = renderIntoDocument(<RepresentativeList representatives={properties} />);
    const ul = findRenderedDOMComponentWithTag(component, 'ul');

    expect(ul.innerHTML).to.equal({properties});
  });

});