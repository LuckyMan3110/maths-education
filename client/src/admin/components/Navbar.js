import React from "react";
import "./../css/Navbar.css";
import { Link, useHistory } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();
  return (
    <div className="Admin__Navbar">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand fst-italic">
            Simplest Math
          </Link>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              sessionStorage.removeItem("loggedin");
              history.push("/admin/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
