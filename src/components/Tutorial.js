import React, { Component } from 'react'
import { Link } from 'react-router'
import Register from '../containers/Register'


export default class Tutorial extends Component {
  render() {
    return (
      <div>
      <div className="tutorial-background"></div>
        <div className="tutorial-container">
          <div className="tutorial-left-text">
            <div className="title_line">
              <h1 className="title">Polis</h1>
            </div>
            <p className="tutorial_text">Empowering voters to take ownership of their democratic system through education, and data.</p>
          </div>
          <div className='getting-started-container'>
           <Link to={'representatives'}>
            <button className="btn btn-default getting_started">Get Started!</button></Link>
            <h4 className="or">- or - </h4>
            <Register />
          </div>
        </div>
      </div>
      );
  }
}
