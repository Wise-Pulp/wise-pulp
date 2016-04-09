import React, { Component } from 'react'



export default class Header extends Component {
  

  logCredentials(event) {
    event.preventDefault();
    console.log(
      "this is this in the header", this
      );
  }

  render() {
    return (
      <div className="header">
        <header>
            <h1 className="main_brand">Polis</h1>
            <h4 className="blurb">Inspiring increased voter participation.</h4>
        </header>
      </div>
    );
  }
}


