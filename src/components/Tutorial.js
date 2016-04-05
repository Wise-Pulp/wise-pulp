import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Tutorial extends Component {
  render() {
    return (
      <div className="tutorial">
        <div className="col-md-3">
          <img className="tutorial_pic" src="http://2.bp.blogspot.com/--_UGll27enA/TjZD_rjkE4I/AAAAAAAAAEE/O9BZlieWD3c/s640/GIF-TUTORIAL-1.gif"  />
        </div>
        <div className="col-md-8 col-md-offset-1">
          <h3>Take A Tour</h3>
          <p className="tutorial_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit</p>
          <br />
        </div>
      </div>
    );
  }
}
