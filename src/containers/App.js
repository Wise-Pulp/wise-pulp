import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import FrontPage from '../containers/FrontPage'
import Profile from '../containers/Profile'
import { getZipCode } from '../actions/index'
const API_KEY = 'AIzaSyD2uEW__R9AOm1JrooaddNSZM1EdN6KhAc'


export default class App extends Component {
	  componentDidMount() {
    	window.navigator.geolocation.getCurrentPosition(function(pos){
      fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + ' &result_type=postal_code&key=' + API_KEY)
        .then(response => response.json())
        .then(location => this.props.dispatch(getRepresentatives(location.results[0].address_components[0].short_name)))
      })
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
