import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Register from '../../containers/Register/Register'

import './Tutorial.scss'

export default class Tutorial extends Component {

  render() {
    return <div>
      <div className="tutorial-background"></div>
      <div className="tutorial-container">
        <div className="tutorial-left-text">
          <div className="title_line">
            <h1 className="title">Polis</h1>
          </div>
          <p className="tutorial_text">Empowering voters to take ownership of their democratic system through education, and data.</p>
        </div>
        <div className='getting-started-container'>
          <Register />
        </div>
      </div>
    </div>
  }
  
}