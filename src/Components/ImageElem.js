import React from 'react';
import './ImageElem.css';

class ImageElem extends React.Component {
  render() {
    return (
      <div><img className="imgElem" src={this.props.src} alt="dog"></img></div>
    );
  }
}

export default ImageElem;
