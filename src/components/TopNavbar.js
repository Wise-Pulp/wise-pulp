import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TopNavbar extends Component {

  render() {

    return (
        <div className='top-nav-bar'>
          <Link className='item' to={'login'}>Login</Link>
          <Link className='item' to={'upcoming_bills'}>Upcoming Bills</Link>
      </div>

    )
  }
  
}