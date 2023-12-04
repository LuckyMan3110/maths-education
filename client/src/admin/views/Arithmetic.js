import React, { useState, useEffect } from "react";
import "./../css/Arithmetic.css";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  isMessage,
} from "./../../CONSTANT";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Arithmetic(props) {
  let query = useQuery();
  const [editMode, setEditMode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    await axios
      .get(CONSTANT.server + "dmas/read")
      .then((responce) => {
        if (responce.status === 200) {
          setQuestions(responce.data);
          setDisplay(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let __init = {
    operation: "add",
    denominator1: "",
    denominator2: "",
    numerator1: "",
    numerator2: "",
  };
  const [question, setQuestion] = useState(__init);

  const preAddQuestion = (e) => {
    e.preventDefault();
    if (isMessage()) {
      resetMessage();
    }
    setQuestion(__init);
    setEditMode(false);
  };

  const preEditQuestion = (e) => {
    e.preventDefault();
    if (isMessage()) {
      resetMessage();
    }
    let _id = e.currentTarget.getAttribute("data-id");
    let found = questions.map((S, I) => {
      if (parseInt(S.id) === parseInt(_id)) {
        setQuestion(S);
        setEditMode(true);
      }
    });
  };

  const changeQuestion = (e) => {
    if (isMessage()) {
      resetMessage();
    }
    let allow = true;
    if (e.target.name !== "operation" && e.target.value === "0") {
      e.target.value = 1;
    }
    if (allow) {
      setQuestion({
        ...question,
        [e.target.name]: e.target.value,
      });
    }
  };

  const editQuestion = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (question.operation !== "") {
      if (
        question.denominator1 !== "" &&
        question.denominator2 !== "" &&
        question.numerator1 !== "" &&
        question.numerator2 !== ""
      ) {
        if (
          parseInt(question.denominator1) !== 0 ||
          parseInt(question.denominator2) !== 0 ||
          parseInt(question.numerator1) !== 0 ||
          parseInt(question.numerator2) !== 0
        ) {
          await axios
            .put(CONSTANT.server + "dmas/update/" + question.id, question)
            .then((responce) => {
              if (responce.status === 200) {
                let res = responce.data;
                if (res.message) {
                  setMessage(res.message);
                } else {
                  fetchAllQuestions();
                  setMessage("Question Updated", "success");
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setMessage("Please fill non zero integers", "danger");
        }
      } else {
        setMessage("Please fill the fraction", "danger");
      }
    } else {
      setMessage("Please select operation", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Update";
  };

  const addQuestion = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (question.operation !== "") {
      if (
        question.denominator1 !== "" &&
        question.denominator2 !== "" &&
        question.numerator1 !== "" &&
        question.numerator2 !== ""
      ) {
        if (
          parseInt(question.denominator1) !== 0 ||
          parseInt(question.denominator2) !== 0 ||
          parseInt(question.numerator1) !== 0 ||
          parseInt(question.numerator2) !== 0
        ) {
          await axios
            .post(CONSTANT.server + "dmas/create", question)
            .then((responce) => {
              if (responce.status === 200) {
                let res = responce.data;
                if (res.message) {
                  setMessage(res.message, "danger");
                } else {
                  fetchAllQuestions();
                  setQuestion(__init);
                  setMessage(
                    "Question#" + (questions.length + 1) + " Added",
                    "success"
                  );
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setMessage("Please fill non zero integers", "danger");
        }
      } else {
        setMessage("Please fill the fraction", "danger");
      }
    } else {
      setMessage("Please select operation", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Add";
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
              <h5 className="modal-title">
                {editMode ? "Update Question" : "Add Question"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="custom-question">
                <p id="error" className=""></p>
                <table id="fcoutput">
                  <tbody>
                    <tr>
                      <td>
                        <table cellPadding={0}>
                          <tbody>
                            <tr>
                              <td align="center" nowrap="true">
                                <input
                                  type="number"
                                  className="form-control custom-aq"
                                  name="numerator1"
                                  value={question.numerator1}
                                  onChange={changeQuestion}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                bgcolor="#000000"
                                className="custom-dash"
                                height={1}
                              />
                            </tr>
                            <tr>
                              <td align="center" nowrap="true">
                                <input
                                  type="number"
                                  className="form-control custom-aq"
                                  name="denominator1"
                                  value={question.denominator1}
                                  onChange={changeQuestion}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="operation"
                          value={question.operation}
                          onChange={changeQuestion}
                        >
                          <option defaultValue value="add">
                            +
                          </option>
                          <option value="subtract">-</option>
                          <option value="multiply">×</option>
                          <option value="divide">÷</option>
                        </select>
                      </td>
                      <td>
                        <table cellPadding={0}>
                          <tbody>
                            <tr>
                              <td align="center" nowrap="true">
                                <input
                                  type="number"
                                  className="form-control custom-aq"
                                  name="numerator2"
                                  value={question.numerator2}
                                  onChange={changeQuestion}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                bgcolor="#000000"
                                className="custom-dash"
                                height={1}
                              />
                            </tr>
                            <tr>
                              <td align="center" nowrap="true">
                                <input
                                  type="number"
                                  className="form-control custom-aq"
                                  name="denominator2"
                                  value={question.denominator2}
                                  onChange={changeQuestion}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                onClick={(e) => {
                  editMode ? editQuestion(e) : addQuestion(e);
                }}
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deleteQuestion = async (e) => {
    let _id = e.currentTarget.getAttribute("data-id");
    await axios
      .delete(CONSTANT.server + "dmas/delete/" + _id)
      .then((responce) => {
        if (responce.status === 200) {
          let res = responce.data;
          if (res.message) {
            setMessage(res.message);
          } else {
            fetchAllQuestions();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="Admin__Arithmetic">
        <div className="row m-3">
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            onClick={() => {
              setDisplay(questions);
            }}
          >
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Total Questions</h4>
                <p className="display-6 mt-1">{questions.length}</p>
              </div>
            </Card>
          </div>
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            onClick={() => {
              setDisplay(
                questions.filter((T) => {
                  return T.operation === "add";
                })
              );
            }}
          >
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Addition Questions</h4>
                <p className="display-6 mt-1">
                  {
                    questions.filter((T) => {
                      return T.operation === "add";
                    }).length
                  }
                </p>
              </div>
            </Card>
          </div>
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            onClick={() => {
              setDisplay(
                questions.filter((T) => {
                  return T.operation === "subtract";
                })
              );
            }}
          >
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Subtraction Questions</h4>
                <p className="display-6 mt-1">
                  {
                    questions.filter((T) => {
                      return T.operation === "subtract";
                    }).length
                  }
                </p>
              </div>
            </Card>
          </div>
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            onClick={() => {
              setDisplay(
                questions.filter((T) => {
                  return T.operation === "multiply";
                })
              );
            }}
          >
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Multiplication Questions</h4>
                <p className="display-6 mt-1">
                  {
                    questions.filter((T) => {
                      return T.operation === "multiply";
                    }).length
                  }
                </p>
              </div>
            </Card>
          </div>
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            onClick={() => {
              setDisplay(
                questions.filter((T) => {
                  return T.operation === "divide";
                })
              );
            }}
          >
            <Card to="#" height="100px">
              <div className="d-flex flex-column justify-content-center align-items-center text-dark">
                <h4>Division Questions</h4>
                <p className="display-6 mt-1">
                  {
                    questions.filter((T) => {
                      return T.operation === "divide";
                    }).length
                  }
                </p>
              </div>
            </Card>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3" onClick={preAddQuestion}>
            <Card to="#stageForm" height="100px">
              <h1 className="h4 fw-bold text-center">Add Question</h1>
            </Card>
          </div>
        </div>
        <div className="row m-3">
          {display.map((Q) => {
            return (
              <div
                key={Q.id}
                className="col-sm-6 col-md-4 col-lg-3 displayCardDMAS position-relative"
              >
                <div
                  className="custom-delete position-absolute"
                  data-id={Q.id}
                  onClick={deleteQuestion}
                >
                  <img src="/delete.svg" />
                </div>
                <Card
                  to="#"
                  height="250px"
                  to="#stageForm"
                  data_id={Q.id}
                  click_func={preEditQuestion}
                >
                  <table id="cardOutput">
                    <tbody>
                      <tr>
                        <td>
                          <table cellPadding={0}>
                            <tbody>
                              <tr>
                                <td align="center" nowrap="true">
                                  {Q.numerator1}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  bgcolor="#000000"
                                  className="custom-dash"
                                  height={1}
                                />
                              </tr>
                              <tr>
                                <td align="center" nowrap="true">
                                  {Q.denominator1}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td className="custom-operation">
                          {Q.operation === "add"
                            ? "+"
                            : Q.operation === "subtract"
                            ? "-"
                            : Q.operation === "multiply"
                            ? "×"
                            : Q.operation === "divide"
                            ? "÷"
                            : ""}
                        </td>
                        <td>
                          <table cellPadding={0}>
                            <tbody>
                              <tr>
                                <td align="center" nowrap="true">
                                  {Q.numerator2}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  bgcolor="#000000"
                                  className="custom-dash"
                                  height={1}
                                />
                              </tr>
                              <tr>
                                <td align="center" nowrap="true">
                                  {Q.denominator2}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-100">
                    <p className="text-center text-muted">
                      {Q.operation.charAt(0).toUpperCase() +
                        Q.operation.slice(1)}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        {Modal()}
        <div className="mt-3" style={{ height: "1px" }}></div>
      </div>
    </>
  );
}

export default Arithmetic;
