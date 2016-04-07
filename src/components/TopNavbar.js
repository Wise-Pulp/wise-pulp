import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TopNavbar extends Component {

  render() {

    return (
      <div>
        <Link to={'upcoming_bills'}>Upcoming Bills</Link>
      </div>

    )
  }
  
}