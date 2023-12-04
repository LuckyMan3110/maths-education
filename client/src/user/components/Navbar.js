import React, { useEffect, useState } from "react";
import "./../css/Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  isMessage,
} from "./../../CONSTANT";

function Navbar(props) {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("loggedin")));
    props.update();
  }, [isUser]);

  const __init = {
    type: "user",
    name: "",
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(__init);
  const [isLogin, setIsLogin] = useState(true);

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (
      credentials.email !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)
    ) {
      if (
        credentials.password !== "" &&
        credentials.type !== "" &&
        credentials.name !== ""
      ) {
        await axios
          .post(CONSTANT.server + "users/create", credentials)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data;
              if (res.message) {
                setMessage(res.message, "danger");
              } else {
                sessionStorage.setItem(
                  "loggedin",
                  JSON.stringify({
                    type: "user",
                    data: res,
                  })
                );
                setIsUser(true);
                document.getElementById("cancel").click();
                props.update();
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
      setMessage("Please Enter Valid Email", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Log In";
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
                    type: "user",
                    data: res,
                  })
                );
                setIsUser(true);
                document.getElementById("cancel").click();
                props.update();
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

  const preLogin = (e) => {
    e.preventDefault();
    if (isMessage()) {
      resetMessage();
    }
    setIsLogin(true);
    setCredentials(__init);
  };

  const preSignup = (e) => {
    e.preventDefault();
    if (isMessage()) {
      resetMessage();
    }
    setIsLogin(false);
    setCredentials(__init);
  };

  const Modal = () => {
    return (
      <div
        className="modal fade"
        id="stageForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isLogin ? "Login" : "Signup"}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p
                className="text-danger"
                id="error"
                style={{ display: "none" }}
              ></p>
              {!isLogin ? (
                <div className="mb-3 custom-input">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={changeCredentials}
                    value={credentials.name}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-3 custom-input">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                id="cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={isLogin ? login : signup}
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="__Navbar">
      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/">
            Simplest Math
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sessionStorage.getItem("loggedin") &&
                  JSON.parse(sessionStorage.getItem("loggedin")).type === "user"
                    ? JSON.parse(sessionStorage.getItem("loggedin")).data.name
                    : "Login/Signup"}
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {sessionStorage.getItem("loggedin") &&
                  JSON.parse(sessionStorage.getItem("loggedin")).type ===
                    "user" ? (
                    <li
                      onClick={() => {
                        sessionStorage.removeItem("loggedin");
                        setIsUser(false);
                      }}
                    >
                      <Link className="dropdown-item" to="#">
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li onClick={preLogin}>
                        <Link
                          className="dropdown-item"
                          to="#stageForm"
                          data-bs-toggle="modal"
                        >
                          Login
                        </Link>
                      </li>
                      <li onClick={preSignup}>
                        <Link
                          className="dropdown-item"
                          to="#stageForm"
                          data-bs-toggle="modal"
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {Modal()}
    </div>
  );
}

export default Navbar;
