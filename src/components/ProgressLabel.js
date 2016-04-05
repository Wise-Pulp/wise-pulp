import React, { Component } from 'react'
import ProgressLabel from 'react-progress-label'


export default class Spinner extends Component {

  render() {
      const {progress} = this.props;
      console.log('progress', progress);
      var textStyle = {
        'fill': 'black',
        'textAnchor': 'middle',
        'fontSize': 40
      };
    return (
      <div>
        <ProgressLabel
          progress={progress}
          startDegree={60}
          progressWidth={8}
          trackWidth={20}
          cornersWidth={4}
          size={400}
          fillColor="white"
          trackColor="red"
          progressColor="blue" 
          >
          <text x="200" y="200" style={textStyle}>Loading</text>          
          </ProgressLabel>
      </div>
    );
  }
}
