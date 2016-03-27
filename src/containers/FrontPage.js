import React, { Component } from 'react'
import Header from '../components/Header'
import HeatMap from '../components/HeatMap'
import Tutorial from '../components/Tutorial'
import GettingStarted from '../components/GettingStarted'
import Spinner from '../components/ProgressLabel'


export default class FrontPage extends Component {
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
      console.log(res.data);
  });
})
  }
  render() {
    return (
      <div className="col-sm-12">
        <Header />
        <HeatMap />
        <Tutorial />
        <GettingStarted />

      </div>
    );
  }
}
