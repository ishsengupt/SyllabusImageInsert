import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="flex__row__center padding-header">
        <NavLink to="/" className="frame__demos header-margin">
          Upload
        </NavLink>

        <NavLink to="/syllabus" className="frame__demos header-margin">
          Syllabi
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);
