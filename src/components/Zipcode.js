import React, { Component } from 'react'

export default class Zipcode extends Component {
  handleSubmit(e) {
      e.preventDefault()
      this.props.zipcodeSubmit(this.zipcode.value)
   }

  render() {
    return <div>
        <h1 className='login-header'>Find Your Representatives</h1>
        <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
          <input className='input-field' placeholder='zipcode' type='zipcode' ref={node => { this.zipcode = node }} />
          <input className='login-button' type='submit' value='Submit' />
        </form>
        <p className='or-header'></p>
      </div>
  }
}