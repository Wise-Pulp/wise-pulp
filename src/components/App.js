import React, { Component } from 'react'
import FrontPage from '../containers/FrontPage'
import Profile from '../containers/Profile'

export default class App extends Component {
  render() {
	const { store, children } = this.props
    return (
      <div className="main col-md-12">
      	{children}
      </div>
    );
  }
}
