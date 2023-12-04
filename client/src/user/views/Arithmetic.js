import React, { useEffect, useState } from "react";
import "./../css/Arithmetic.css";
import fc from "fraction-calculator";
import { CONSTANT, setMessage, resetMessage, isMessage } from "../../CONSTANT";
import axios from "axios";
import Card from "../components/Card";
function Arithmetic(props) {
  useEffect(() => {
    fetchVideoLinks();
  }, []);

  const [videoLinks, setVideoLinks] = useState({
    addSubtract: "",
    multiply: "",
    divide: "",
  });
  const fetchVideoLinks = async () => {
    await axios
      .get(CONSTANT.server + "info/videoLinks/dmas")
      .then((responce) => {
        if (responce.status === 200) {
          setVideoLinks(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateFraction = (n1, d1, n2, d2, O) => {
    let D,
      N,
      f1 = n1.toString() + "/" + d1.toString(),
      f2 = n2.toString() + "/" + d2.toString();
    let F = fc(f1);
    if (O === "add") {
      F = F.plus(f2);
    } else if (O === "subtract") {
      F = F.minus(f2);
    } else if (O === "multiply") {
      F = F.times(f2);
    } else if (O === "divide") {
      F = F.div(f2);
    }
    let number = F.toNumber();
    F = F.toFraction().split("/");
    return {
      numerator: F[0],
      denominator: F[1],
      number: number,
    };
  };

  const readyExplanation = (n1, d1, n2, d2, O, mn, md) => {
    let sign =
      O === "add"
        ? "+"
        : O === "subtract"
        ? "-"
        : O === "multiply"
        ? "×"
        : O === "divide"
        ? "÷"
        : "";
    return (
      <>
        {mn !== "" && md !== "" ? (
          <>
            <br />
            <p className="lead my-3">Your answer</p>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(mn, md)}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  <td>{fc(mn + "/" + md).toNumber()}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          ""
        )}
        <p className="lead my-3">Solution</p>
        <table>
          <tbody>
            <tr>
              <td>=&nbsp;</td>
              {twoFractionHTML(n1, d1)}
              <td>{sign}</td>
              {twoFractionHTML(n2, d2)}
            </tr>
          </tbody>
        </table>
        {O === "add" || O === "subtract" ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(
                    "(" +
                      n1 +
                      "×" +
                      d2 +
                      ") " +
                      sign +
                      " (" +
                      n2 +
                      "×" +
                      d1 +
                      ")",
                    d1 + "×" + d2
                  )}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(
                    "(" + n1 * d2 + ") " + sign + " (" + n2 * d1 + ")",
                    d1 * d2
                  )}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {O === "add"
                    ? twoFractionHTML(n1 * d2 + n2 * d1, d1 * d2)
                    : O === "subtract"
                    ? twoFractionHTML(n1 * d2 - n2 * d1, d1 * d2)
                    : O === "multiply"
                    ? twoFractionHTML(n1 * d2 * (n2 * d1), d1 * d2)
                    : O === "divide"
                    ? twoFractionHTML((n1 * d2) / (n2 * d1), d1 * d2)
                    : ""}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  <td>
                    {O === "add"
                      ? fc(n1 * d2 + n2 * d1 + "/" + d1 * d2).toNumber()
                      : O === "subtract"
                      ? fc(n1 * d2 - n2 * d1 + "/" + d1 * d2).toNumber()
                      : O === "multiply"
                      ? fc(n1 * d2 * (n2 * d1) + "/" + d1 * d2).toNumber()
                      : O === "divide"
                      ? fc((n1 * d2) / (n2 * d1) + "/" + d1 * d2).toNumber()
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="lead my-3">How to solve</p>
            {/* Add/Subtract */}
            <iframe
              className="w-100"
              height="315"
              src={videoLinks.addSubtract}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ) : O === "multiply" ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(
                    "(" + n1 + ") × (" + n2 + ")",
                    "(" + d1 + ") × (" + d2 + ")"
                  )}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(n1 * n2, d1 * d2)}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  <td>{fc(n1 * n2 + "/" + d1 * d2).toNumber()}</td>
                </tr>
              </tbody>
            </table>
            <p className="lead my-3">See how to solve!</p>
            {/* Multiplication */}
            <iframe
              className="w-100"
              height="315"
              src={videoLinks.multiply}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ) : O === "divide" ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(n1, d1)}
                  <td>×</td>
                  {twoFractionHTML(d2, n2)}
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(
                    "(" + n1 + ") × (" + d2 + ")",
                    "(" + d1 + ") × (" + n2 + ")"
                  )}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  {twoFractionHTML(n1 * d2, d1 * n2)}
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>=&nbsp;</td>
                  <td>{fc(n1 * d2 + "/" + d1 * n2).toNumber()}</td>
                </tr>
              </tbody>
            </table>
            <p className="lead my-3">See how to solve!</p>
            {/* Division */}
            <iframe
              className="w-100"
              height="315"
              src={videoLinks.divide}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  const twoFractionHTML = (up, down) => {
    return (
      <td>
        <table cellPadding={0}>
          <tbody>
            <tr>
              <td rowSpan={3} />
              <td align="center">{up}</td>
            </tr>
            <tr>
              <td bgcolor="#000000" height={1} />
            </tr>
            <tr>
              <td align="center">{down}</td>
            </tr>
          </tbody>
        </table>
      </td>
    );
  };

  const [operation, setOperation] = useState("all");
  const [isTrying, setIsTrying] = useState(true);
  const [answer, setAnswer] = useState({
    numerator: "",
    denominator: "",
  });
  const [drill, setDrill] = useState({
    numerator: "",
    denominator: "",
    operation: "add",
    denominator1: "",
    denominator2: "",
    numerator1: "",
    numerator2: "",
  });
  const __init_O = {
    numerator: "",
    denominator: "",
    operation: "",
    denominator1: "",
    denominator2: "",
    numerator1: "",
    numerator2: "",
  };
  const [official, setOfficial] = useState(__init_O);
  const changeOfficial = (e) => {
    setOfficial({
      ...official,
      [e.target.name]: e.target.value,
    });
  };
  const fetchDrill = async () => {
    await axios
      .get(CONSTANT.server + "info/drill/dmas/" + operation)
      .then((responce) => {
        if (responce.status === 200) {
          setDrill({
            ...responce.data,
            numerator: "",
            denominator: "",
          });
          setAnswer({
            numerator: "",
            denominator: "",
          });
          setIsTrying(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDrill();
  }, [operation]);
  const changeDrill = (e) => {
    setDrill({
      ...drill,
      [e.target.name]: e.target.value,
    });
  };
  const submitDrill = () => {
    setOfficial(__init_O);
    setAnswer({
      numerator: "",
      denominator: "",
    });
    if (
      drill.numerator !== "" &&
      drill.denominator !== "" &&
      parseInt(drill.numerator) !== 0 &&
      parseInt(drill.denominator) !== 0
    ) {
      setOfficial({
        numerator: drill.numerator,
        denominator: drill.denominator,
        operation: drill.operation,
        denominator1: drill.denominator1,
        denominator2: drill.denominator2,
        numerator1: drill.numerator1,
        numerator2: drill.numerator2,
      });
      let temp = calculateFraction(
        drill.numerator1,
        drill.denominator1,
        drill.numerator2,
        drill.denominator2,
        drill.operation
      );
      let isCorrect = false;
      if (
        fc(drill.numerator.toString() + "/" + drill.denominator.toString())
          .toNumber()
          .toFixed(2) === temp.number.toFixed(2)
      ) {
        isCorrect = true;
      }
      updateScoreOfUser(isCorrect);
      setAnswer({ ...temp, isCorrect: isCorrect });
    }
  };
  const updateScoreOfUser = async (isCorrectArgument) => {
    if (
      sessionStorage.getItem("loggedin") &&
      JSON.parse(sessionStorage.getItem("loggedin")).type === "user"
    ) {
      await axios
        .put(
          CONSTANT.server +
            "users/updateScore/" +
            JSON.parse(sessionStorage.getItem("loggedin")).data.id,
          { isCorrect: isCorrectArgument }
        )
        .then((responce) => {
          if (responce.status === 200) {
            // Updated
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const Modal = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Validation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {answer.isCorrect === true ? (
                <h1 className="display-4 fst-italic text-success text-center">
                  Correct!
                </h1>
              ) : answer.isCorrect === false ? (
                <h1 className="display-4 fst-italic text-danger text-center">
                  Wrong!
                </h1>
              ) : (
                <h1 className="display-5 fst-italic text-danger text-center">
                  Invalid!
                </h1>
              )}
              {!isTrying ? (
                <>
                  {readyExplanation(
                    official.numerator1,
                    official.denominator1,
                    official.numerator2,
                    official.denominator2,
                    official.operation,
                    official.numerator,
                    official.denominator
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                id="cancel"
                onClick={() => {
                  setIsTrying(true);
                }}
              >
                Try Again
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  setIsTrying(false);
                }}
                style={{
                  display: `${
                    answer.isCorrect === true
                      ? "unset"
                      : answer.isCorrect === false
                      ? "unset"
                      : "none"
                  }`,
                }}
              >
                Solution
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [mode, setMode] = useState("pre");
  const [sheet, setSheet] = useState([]);
  useEffect(() => {
    fetchSheet();
  }, [mode, operation]);
  const fetchSheet = async () => {
    await axios
      .get(CONSTANT.server + "info/sheet/dmas/" + operation + "/" + mode)
      .then((responce) => {
        if (responce.status === 200) {
          setSheet(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitQuestion = (e) => {
    setOfficial(__init_O);
    setAnswer({
      numerator: "",
      denominator: "",
    });
    let T = e.target.getAttribute("data-id");
    let N = document.getElementById("N-" + T).value;
    let D = document.getElementById("D-" + T).value;
    let N1 = document.getElementById("N1-" + T).innerText;
    let D1 = document.getElementById("D1-" + T).innerText;
    let N2 = document.getElementById("N2-" + T).innerText;
    let D2 = document.getElementById("D2-" + T).innerText;
    let O = document.getElementById("O" + T).getAttribute("data-val");
    if (
      N !== "" &&
      D !== "" &&
      parseInt(N) !== 0 &&
      parseInt(D) !== 0 &&
      parseInt(N) !== null &&
      parseInt(D) !== null
    ) {
      setOfficial({
        numerator: N,
        denominator: D,
        operation: O,
        denominator1: D1,
        denominator2: D2,
        numerator1: N1,
        numerator2: N2,
      });
      let temp = calculateFraction(N1, D1, N2, D2, O);
      let isCorrect = false;
      if (
        fc(N.toString() + "/" + D.toString())
          .toNumber()
          .toFixed(2) === temp.number.toFixed(2)
      ) {
        isCorrect = true;
        e.target.classList.remove(
          "btn-outline-dark",
          "btn-success",
          "btn-danger"
        );
        e.target.classList.add("btn-success");
      } else {
        e.target.classList.remove(
          "btn-outline-dark",
          "btn-success",
          "btn-danger"
        );
        e.target.classList.add("btn-danger");
      }
      updateScoreOfUser(isCorrect);
      setAnswer({ ...temp, isCorrect: isCorrect });
    }
  };

  return (
    <>
      <div className="__Arithmetic">
        <div className="mb-4 custom-options bg-light rounded-3">
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              operation === "add" ? "active" : ""
            }`}
            onClick={() => {
              setOperation("add");
            }}
          >
            Addition
          </div>
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              operation === "subtract" ? "active" : ""
            }`}
            onClick={() => {
              setOperation("subtract");
            }}
          >
            Subtraction
          </div>
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              operation === "multiply" ? "active" : ""
            }`}
            onClick={() => {
              setOperation("multiply");
            }}
          >
            Multiplication
          </div>
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              operation === "divide" ? "active" : ""
            }`}
            onClick={() => {
              setOperation("divide");
            }}
          >
            Division
          </div>
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              operation === "all" ? "active" : ""
            }`}
            onClick={() => {
              setOperation("all");
            }}
          >
            Mixed
          </div>
        </div>
        <div className="p-4 p-md-5 mb-4 bg-light rounded-3">
          <div className="px-0">
            <h1 className="display-4 fst-italic">Try Out The Drill..</h1>
            <p className="lead my-3">Solve this fraction</p>
          </div>
          <div className="row d-flex justify-content-center aligh-items-center">
            <table id="cardOutput">
              <tbody>
                <tr>
                  <td>
                    <table cellPadding={0}>
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            nowrap="true"
                            className="number-size"
                          >
                            {drill.numerator1}
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
                          <td
                            align="center"
                            nowrap="true"
                            className="number-size"
                          >
                            {drill.denominator1}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="custom-operation">
                    {drill.operation === "add"
                      ? "+"
                      : drill.operation === "subtract"
                      ? "-"
                      : drill.operation === "multiply"
                      ? "×"
                      : drill.operation === "divide"
                      ? "÷"
                      : ""}
                  </td>
                  <td>
                    <table cellPadding={0}>
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            nowrap="true"
                            className="number-size"
                          >
                            {drill.numerator2}
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
                          <td
                            align="center"
                            nowrap="true"
                            className="number-size"
                          >
                            {drill.denominator2}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="custom-operation">=</td>
                  <td>
                    <table cellPadding={0}>
                      <tbody>
                        <tr>
                          <td align="center" nowrap="true">
                            <input
                              type="number"
                              className="form-control custom-aq"
                              name="numerator"
                              id="numerator"
                              value={drill.numerator}
                              onChange={changeDrill}
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
                              name="denominator"
                              id="denominator"
                              value={drill.denominator}
                              onChange={changeDrill}
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
          <div className="text-center mt-3">
            <button
              type="button"
              className={`btn btn-${
                answer.isCorrect === true
                  ? "success"
                  : answer.isCorrect === false
                  ? "danger"
                  : "outline-dark"
              }`}
              style={{ width: "30%" }}
              onClick={submitDrill}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Check
            </button>
            <button
              type="button"
              className="ms-3 btn btn-outline-success"
              style={{ width: "30%" }}
              onClick={fetchDrill}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-2 mb-2" style={{ height: "1px" }}></div>
        <div className="p-4 mb-4 bg-light rounded-3 text-center">
          <h1 className="display-5 fst-italic">Practice Worksheets</h1>
        </div>
        <div className="mb-4 custom-options bg-light rounded-3">
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              mode === "pre" ? "active" : ""
            }`}
            onClick={() => {
              setMode("pre");
            }}
          >
            Prebuild Sheet
          </div>
          <div
            className={`text-dark custom-sidebar-item p-2 rounded-3 text-center ${
              mode === "random" ? "active" : ""
            }`}
            onClick={() => {
              setMode("random");
            }}
          >
            Random Sheet
          </div>
        </div>
        <div className="row">
          {sheet.map((S) => {
            return (
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                key={`UNIQUE${S.id}`}
              >
                <Card key={`UNIQUE${S.id}`}>
                  <div className="row d-flex justify-content-center aligh-items-center">
                    <table id="cardOutput">
                      <tbody>
                        <tr>
                          <td>
                            <table cellPadding={0}>
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    nowrap="true"
                                    className="number-size"
                                    id={`N1-${S.id}`}
                                  >
                                    {S.numerator1}
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
                                  <td
                                    align="center"
                                    nowrap="true"
                                    className="number-size"
                                    id={`D1-${S.id}`}
                                  >
                                    {S.denominator1}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            data-val={S.operation}
                            className="custom-operation"
                            id={`O${S.id}`}
                          >
                            {S.operation === "add"
                              ? "+"
                              : S.operation === "subtract"
                              ? "-"
                              : S.operation === "multiply"
                              ? "×"
                              : S.operation === "divide"
                              ? "÷"
                              : ""}
                          </td>
                          <td>
                            <table cellPadding={0}>
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    nowrap="true"
                                    className="number-size"
                                    id={`N2-${S.id}`}
                                  >
                                    {S.numerator2}
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
                                  <td
                                    align="center"
                                    nowrap="true"
                                    className="number-size"
                                    id={`D2-${S.id}`}
                                  >
                                    {S.denominator2}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td className="custom-operation">=</td>
                          <td>
                            <table cellPadding={0}>
                              <tbody>
                                <tr>
                                  <td align="center" nowrap="true">
                                    <input
                                      type="number"
                                      className="form-control custom-aq"
                                      name="numerator"
                                      id={`N-${S.id}`}
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
                                      name="denominator"
                                      id={`D-${S.id}`}
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
                  <div className="text-center mt-3 w-100 mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-dark w-100"
                      onClick={submitQuestion}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-id={S.id}
                    >
                      Submit
                    </button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {Modal()}
    </>
  );
}

export default Arithmetic;
