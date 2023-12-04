import React from "react";
import "./../css/Card.css";

function Card(props) {
  return (
    <div className="p-2 bg-light rounded-3 custom-card-user">
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{ height: props.height }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Card;
