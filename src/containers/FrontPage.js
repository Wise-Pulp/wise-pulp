import React, { Component } from 'react'
import Header from '../components/Header'
import HeatMap from '../components/HeatMap'
import Tutorial from '../components/Tutorial'
import GettingStarted from '../components/GettingStarted'
import Spinner from '../components/ProgressLabel'


export default class FrontPage extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <Header />
        <HeatMap />
        <Tutorial />
        <GettingStarted />
<<<<<<< 91ecd3eedcd7222ef53af1f70ffb600f3f85106c:src/containers/FrontPage.js
=======
        <Spinner />
>>>>>>> Added progress spinner using react-progress-label:containers/FrontPage.js
      </div>
    );
  }
}
