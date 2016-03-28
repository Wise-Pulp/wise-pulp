import React, { Component } from 'react'
import FrontPage from '../containers/FrontPage'
import Profile from '../containers/Profile'

export default class App extends Component {
  render() {
	const { store } = this.props
    return (
      <div className="col-md-8 col-md-offset-4">
      	{this.children.props}
      </div>
    );
  }
}
