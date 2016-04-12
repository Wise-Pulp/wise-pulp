import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { processLogout } from '../actions/actionLogin'

export default class TopNavbar extends Component {

  logout(e) {
    e.preventDefault();
    this.props.dispatch(processLogout())
  }

  render() {
    const { isLoggedIn } = this.props
    return (
        <div className='top-nav-bar'>
          { isLoggedIn ?  <a href='#' className='item' onClick={e => this.logout(e)}>Logout</a> : 
                          <Link className='item' to={'login'}>Login</Link> }
          <Link className='item' to={'upcoming_bills'}>Upcoming Bills</Link>
          <Link className='item' to={'representatives'}>Representatives</Link>
          <Link className='home' to={'home'}>Home</Link>
      </div>

    )
  }
  
}

function mapStateToProps(state) {
  console.log(state)
  const isLoggedIn = state.user.isLoggedIn
  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps)(TopNavbar)