import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {

  render() {

    return (
      <div className='footer col-sm-12'>
        <h3>Contributors</h3>
        <p>
        <a href="http://linkedin.com/in/colinlmcdonald" target="_blank">Colin McDonald</a>, <a href="http://www.linkedin.com/in/lechristopher-blackwell-9476b89a" target="_blank">Lee Blackwell</a>, and <a href="http://linkedin.com/in/dejongill" target="_blank">Dejon Gill</a> With special thanks to the <a href="https://www.govtrack.us/">Govtrack</a> team.</p>
      </div>

    )
  }
  
}