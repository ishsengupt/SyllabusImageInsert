import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, withRouter, NavLink } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function LinksContainer(props) {
  const [open, setOpen] = useState(false);

  let rootComments;
  if (open) {
    rootComments = props.comments.map((c, index) => (
      <div className="flex__row border__item">
        <ImageContainer image={c.site} />
        <Link
          to={c.linkHref}
          className="padding__left smaller__font padding__sides"
        >
          {c.linkText}
        </Link>
      </div>
    ));
  } else if (!open) {
    rootComments = (
      <div className="flex__row border__item card">
        <ImageContainer image={props.comments[0].site} />
        <Link
          to={props.comments[0].linkHref}
          className="padding__left smaller__font padding__sides"
        >
          {props.comments[0].linkText}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex__column">
      {rootComments}
      <button className="toggle__button" onClick={() => setOpen(!open)}>
        Toggle
      </button>
    </div>
  );
}

export default withRouter(LinksContainer);
