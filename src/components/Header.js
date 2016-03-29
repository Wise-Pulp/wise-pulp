import React, { Component } from 'react'



export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="col-md-12">
            <div className="row col-md-offset-5">
              <h1>Polis</h1>
            </div>
          </div>
          <div className="col-md-1 col-md-offset-9">
            <div className="row">
              <input type="text" placeholder="User Name" />
              <input type="password" placeholder="Password" />
              <button className="btn btn-default">Log In</button>
              <button className="btn btn-default">Sign Up</button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}


