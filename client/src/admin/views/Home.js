import React, { useState, useEffect } from "react";
import "./../css/Home.css";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  isMessage,
} from "./../../CONSTANT";
import axios from "axios";

function Home(props) {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetchAllInfo();
  }, []);

  const fetchAllInfo = async () => {
    await axios
      .get(CONSTANT.server + "info/total")
      .then((responce) => {
        if (responce.status === 200) {
          setInfo(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [credentials, setCredentials] = useState({
    ...JSON.parse(sessionStorage.getItem("loggedin")).data,
    type: "admin",
  });

  const preUpdateUser = (e) => {
    e.preventDefault();
    if (isMessage()) {
      resetMessage();
    }
    setCredentials({
      ...JSON.parse(sessionStorage.getItem("loggedin")).data,
      type: "admin",
    });
  };

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (credentials.email !== "") {
      if (credentials.password !== "" && credentials.type !== "") {
        await axios
          .put(CONSTANT.server + "users/update/" + credentials.id, credentials)
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
                setMessage("User Updated", "success");
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
              <h5 className="modal-title">Update Admin</h5>
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={updateUser}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="Admin__Home">
        <div className="row m-3">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Total Questions</h4>
                <p className="display-6 mt-1">{info.arithmetic}</p>
              </div>
            </Card>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Total Users</h4>
                <p className="display-6 mt-1">{info.users}</p>
              </div>
            </Card>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Card to="/admin/arithmetic" height="250px">
              <h1 className="display-6 fw-bold text-center">Arithmetic</h1>
            </Card>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Card to="#stageForm" height="250px" click_func={preUpdateUser}>
              <h1 className="display-6 fw-bold text-center">Settings</h1>
            </Card>
          </div>
        </div>
        <div className="mt-3" style={{ height: "1px" }}></div>
      </div>
      {Modal()}
    </>
  );
}

export default Home;
