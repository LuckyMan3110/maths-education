import React, { useEffect, useState } from "react";
import "./../css/Card.css";
import { Link } from "react-router-dom";
function Card(props) {
  const bs_toggle = props.to === "#stageForm" ? "modal" : "";
  return (
    <div onClick={props.click_func} data-id={props.data_id}>
      <Link to={props.to} data-bs-toggle={bs_toggle}>
        <div className="p-2 bg-light rounded-3 custom-card">
          <div
            className="container-fluid d-flex flex-column justify-content-center align-items-center"
            style={{ height: props.height }}
          >
            {props.children}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
