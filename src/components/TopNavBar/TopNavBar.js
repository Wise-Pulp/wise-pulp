import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { processLogout } from '../../actions/actionLogin'

import './TopNavBar.scss';

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
                          <Link to={'login'}><button className='login-button'>Login</button></Link> }
          <Link className='item' to={'upcoming_bills'}>Upcoming Bills</Link>
          <Link className='item' to={'representatives'}>Representatives</Link>
          <Link to={'home'}><div className="logo-container home"></div></Link>
          <Link to={'home'}><div className="home"><h4>Polis</h4></div></Link>
      </div>

    )
  }
  
}

function mapStateToProps(state) {
  const isLoggedIn = state.user.isLoggedIn
  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps)(TopNavbar)