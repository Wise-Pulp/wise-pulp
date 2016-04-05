import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Header from '../components/Header'
import HeatMap from '../components/HeatMap'
import Tutorial from '../components/Tutorial'
import GettingStarted from '../components/GettingStarted'
import Spinner from '../components/Spinner'


export default class FrontPage extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <Header />
        <Tutorial />
        <HeatMap />
        <GettingStarted />
      </div>
    );
  }
}