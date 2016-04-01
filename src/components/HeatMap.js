import React, { Component } from 'react'



export default class HeatMap extends Component {
  render() {
    return (
      <div className="container splash_data">
      <h2>Voter Turn Out In Your Area (County Name?)</h2>
      <div className="col-md-4">
      <img className="heat_map" src="https://pbs.twimg.com/media/CS82xWSWIAAdBmZ.png:large" />
      </div>
      <div className="col-md-4 col-md-offset-4">
        <p className="data_info">Would it be very difficult to somehow have a short description of each data-viz and put it here? If so, we can get rid of this paragraph.<br />
          Otherwise we could add so many paragraphs!<br />
          Visualize all of the data!!!!!</p>
      </div>
      </div>
      );
  }
}

