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
      <div className="container header">
        <header>
          <div className="col-md-12">
            <div className="row col-md-offset-5">
              <h1>Polis</h1>
            </div>
          </div>
          <div className="col-md-2 col-md-offset-8">
            <div className="row">
                <form action='/api/signup' method="POST" className="signup">
                    Name: <input type="text" username="name" />
                    Password: <input type="text" password="password" />
                  <input type="submit" value="Sign up" />
                </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}


