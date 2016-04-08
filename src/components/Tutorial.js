import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Tutorial extends Component {
  render() {
    return (
      <div className="tutorial col-md-12">
      <div className="col-md-3">
      <img className="tutorial_pic" src="http://2.bp.blogspot.com/--_UGll27enA/TjZD_rjkE4I/AAAAAAAAAEE/O9BZlieWD3c/s640/GIF-TUTORIAL-1.gif"  />
      </div>
      <div className="col-md-8 col-md-offset-1">
      <h3>Our Mission</h3>
      <p className="tutorial_text">Assisting voters in taking ownership of their democratic system through education, and data. Compare your views with your representatives' voting records, and track your representative's record. See who representatives influence (through bills, committees, etc.) and who influences them (through campaign contributions) and more. Click below to get started!​</p>
      <br />
      <Link to={'representatives'}><button className="btn btn-default getting_started">Get Started!</button></Link>
      </div>
      </div>
      );
  }
}
