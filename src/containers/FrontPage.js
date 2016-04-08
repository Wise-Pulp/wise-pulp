import React, { Component } from 'react'
import Header from '../components/Header'
import HeatMap from '../components/HeatMap'
import Tutorial from '../components/Tutorial'
import GettingStarted from '../components/GettingStarted'
import TopNavbar from '../components/TopNavbar'


export default class FrontPage extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <Header />
        <TopNavbar />
        <Tutorial />
        <HeatMap />
        <GettingStarted />
      </div>
    );
  }
}