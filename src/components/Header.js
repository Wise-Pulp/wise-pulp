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
          <div className="col-md-12">
            <div className="col-md-offset-5">
              <h1 className="main_brand">Polis</h1>
            </div>
            <h4 className="blurb">Blending civics and tech to bridge the gap between voters and representatives, inspiring increased voter participation.</h4>
          </div>
          <div className="col-md-2 col-md-offset-8">
            
                <form action='/api/signup' method="POST" className="signup">
                    <input className="userName" type="text" username="name" placeholder="User Name"/>
                    <input type="password" password="password" placeholder="Password" />
                  <input type="submit" value="Sign up" />
                </form>
            </div>
         
        </header>
      </div>
    );
  }
}


