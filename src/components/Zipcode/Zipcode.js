import React, { Component } from 'react';

import './Zipcode.scss';

export default class Zipcode extends Component {
  handleSubmit(e) {
      e.preventDefault()
      this.props.zipcodeSubmit(this.zipcode.value)
   }

  render() {
    return <div className="zipcode-container">
        <p className='zipcode-header'>Find Your Representatives</p>
        <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
          <input className='zipcode-field' placeholder='zipcode' type='zipcode' ref={node => { this.zipcode = node }} />
          <br />
          <input className='zipcode-button' type='submit' value='Submit' />
        </form>
      </div>
  }
}