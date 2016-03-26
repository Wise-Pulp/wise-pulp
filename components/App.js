import React, { Component } from 'react'
import FrontPage from '../containers/FrontPage'

export default class App extends Component {
  render() {
    return (
      <div className="col-md-8 col-md-offset-4">
        <FrontPage />
      </div>
    );
  }
}
