import React, { Component } from 'react'
import FrontPage from '../containers/FrontPage'
import Profile from '../containers/Profile'
import { getZipCode } from '../actions/index'

export default class App extends Component {
	  componentDidMount() {
    	getZipCode()
    }

  render() {
	const { store, children } = this.props
    return (
      <div className="col-md-8 col-md-offset-4">
      	{children}
      </div>
    );
  }
}
