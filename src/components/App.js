import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import FrontPage from '../containers/FrontPage'
import Representatives from '../containers/Representatives'
import { getRepresentatives } from '../actions/index'

export default class App extends Component {
  render() {
	  const { store, children } = this.props
    return (
      <div>
      	{children}
      </div>
    );
  }
}

export default connect()(App)