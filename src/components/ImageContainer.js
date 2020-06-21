import React from "react";
import Google from "../images/google.png";
import Quora from "../images/quora.png";
import Reddit from "../images/reddit.png";

class ImageContainer extends React.Component {
  render() {
    let button;
    if (this.props.image == "quora") {
      button = <img className="image__container" src={Quora} />;
    } else if (this.props.image == "reddit") {
      button = <img className="image__container" src={Reddit} />;
    } else if (this.props.image == "google") {
      button = <img className="image__container" src={Google} />;
    }

    return <div className="flex__column">{button}</div>;
  }
}

export default ImageContainer;
