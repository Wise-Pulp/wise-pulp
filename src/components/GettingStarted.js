import React, { Component } from 'react'
import { Link } from 'react-router'



export default class GettingStarted extends Component {
  render() {
    return (
      <div className="container get_started">
        <div className="col-md-8">
          <h3>Getting Started Is Easy</h3>
          <p className="tutorial_text">Click on Getting Started to find your Senators and Congress Person, track bills and compare your votes to your representatives!</p>
            <br />
        </div>
        <div className="col-md-3 col-md-offset-1">
          <img className="tutorial_pic" src="http://2.bp.blogspot.com/--_UGll27enA/TjZD_rjkE4I/AAAAAAAAAEE/O9BZlieWD3c/s640/GIF-TUTORIAL-1.gif"  />
        </div>
          <Link to={'representatives'}><button className="btn btn-default getting_started_large">Get Started</button></Link>
      </div>
    );
  }
}

