import React from "react";
import "./../css/Sidebar.css";
import { Link } from "react-router-dom";
function Sidebar(props) {
  return (
    <div className="custom-sidebar sticky-top pt-3">
      <Link to="/arithmetic">
        <div
          className={`text-dark custom-sidebar-item p-2 bg-light rounded-3 text-center ${
            props.active === "arithmetic" ? "active" : ""
          }`}
        >
          Arithmetic
        </div>
      </Link>
      <Link to="#">
        <div
          className={`text-dark custom-sidebar-item p-2 bg-light rounded-3 text-center ${
            props.active === "whatever" ? "active" : ""
          }`}
        >
          More to come...
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
