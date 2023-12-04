import React, { useState, useEffect } from "react";
import "./../css/Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  isMessage,
} from "./../../CONSTANT";

function Login(props) {
  const history = useHistory();
  const __init = {
    type: "admin",
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(__init);

  const changeCredentials = (e) => {
    // console.log(JSON.parse(sessionStorage.getItem("loggedin")));
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (credentials.email !== "") {
      if (credentials.password !== "" && credentials.type !== "") {
        await axios
          .post(CONSTANT.server + "users/validate", credentials)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data;
              if (res.message) {
                setMessage(res.message, "danger");
              } else {
                sessionStorage.setItem(
                  "loggedin",
                  JSON.stringify({
                    type: "admin",
                    data: res,
                  })
                );
                history.push("/admin/");
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setMessage("Please Enter Password", "danger");
      }
    } else {
      setMessage("Please Enter Email", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Log In";
  };

  return (
    <div className="Admin__Login">
      <main className="form-signin">
        <h1 className="display-5 text-center mb-5">Admin Panel</h1>

        <h1 className="h3 mb-3 fw-normal text-center">Log In</h1>
        <p className="text-danger" id="error" style={{ display: "none" }}></p>

        <div className="mb-3 custom-input">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={changeCredentials}
            value={credentials.email}
          />
        </div>
        <div className="mb-3 custom-input">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={changeCredentials}
            value={credentials.password}
          />
        </div>

        <div className="w-100 mt-3 mb-3 custom-button">
          <button className="w-100 btn btn-lg btn-primary" onClick={login}>
            Sign in
          </button>
        </div>
        <p className="lead">© Simplest Math</p>
      </main>
    </div>
  );
}

export default Login;
