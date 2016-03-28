import React from 'react';
import {expect} from 'chai';
import fetch from 'isomorphic-fetch'
import getRepresentatives from '../actions/index.js'



describe('getRepresentatives'), () => {

  it('should receive the correct Senior Senator', () => {
    const caSeniorSenator = 'Dianne Feinstein';
    const rep = getRepresentatives(94544);
    expect(rep).to.equal(caSeniorSenator);
  });
}


