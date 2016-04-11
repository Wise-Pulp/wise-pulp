import React, { Component } from 'react'

export default class TwitterWidget extends Component {

  componentDidMount() {
    return function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  }

 render() {
  return <div>
    <a href="https://twitter.com/share" className="twitter-share-button" data-via="mickydwow">Tweet</a>
  </div>
 } 

}
