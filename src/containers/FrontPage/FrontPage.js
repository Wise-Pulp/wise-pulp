import React, { Component } from 'react';

import HeatMap from '../../components/HeatMap/HeatMap';
import Tutorial from '../../components/Tutorial/Tutorial';
import GettingStarted from '../../components/GettingStarted/GettingStarted';
import TopNavBarbar from '../../components/TopNavBar/TopNavBar';

import './FrontPage.scss';


export default class FrontPage extends Component {
  render() {
    return <div className="front-page">   
      <Tutorial />
      <div className="track">
        <h2>Track Your Representatives</h2>
        <p>Folow your Senators and Congressional Representatives. View their voting records, and decide how you would have voted on the same Bills. Check out how frequently you agree with the positions held by the people elected to represent you.</p>
      </div>
      <div className="future">
        <h2>View Upcoming Legislation</h2>
        <p>See Bills scheduled to be debated before the House and Senate. Vote on the Bills here, and then find out how your Representatives voted on those Bills.</p>
      </div>
    </div>
  }
}