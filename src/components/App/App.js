import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopNavbar from '../TopNavbar'
import Footer from '../Footer'
import { getContributorData } from '../../actions/actionContributor'
import { getRepresentatives } from '../../actions/actionRepresentatives'

export default class App extends Component {

  componentDidMount() {
  window.navigator.geolocation.getCurrentPosition(function(pos){
        fetch('/api/zipcode/' + pos.coords.latitude + '/' + pos.coords.longitude)
          .then(response => response.json())
          .then(location => {
            this.props.dispatch(getRepresentatives(location.results[0].address_components[0].short_name))
            this.props.dispatch(getContributorData(location.results[0].address_components[0].short_name))
        })
      }.bind(this))
  }
  render() {
	  const { store, children } = this.props
    return (
      <div>
        <TopNavbar />
      	{children}
        <Footer />
      </div>
    )
  }
}

export default connect()(App)