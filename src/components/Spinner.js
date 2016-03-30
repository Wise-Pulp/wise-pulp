import React, { Component } from 'react'
import ProgressLabel from 'react-progress-label'

export default class Spinner extends Component {
  render() {
    console.log(this.props.progress)
      var textStyle = {
        'fill': 'black',
        'textAnchor': 'middle'
      };
    return (
        <ProgressLabel
          progress={this.props.progress}
          startDegree={60}
          progressWidth={8}
          trackWidth={20}
          cornersWidth={4}
          size={100}
          fillColor="white"
          trackColor="red"
          progressColor="blue"
           
          />
    );
  }
}

