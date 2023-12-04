import React, { useEffect, useState } from "react";
import "./../css/Home.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  isMessage,
} from "./../../CONSTANT";

function Home(props) {
  useEffect(() => {
    fetchUserAttempts();
  }, []);
  const [isLogin, setIsLogin] = useState(false);
  const [attempts, setAttempts] = useState({
    correctattempt: "",
    wrongattempt: "",
  });
  const fetchUserAttempts = async () => {
    if (
      sessionStorage.getItem("loggedin") &&
      JSON.parse(sessionStorage.getItem("loggedin")).type === "user"
    ) {
      setIsLogin(true);
      await axios
        .get(
          CONSTANT.server +
            "info/attempt/" +
            JSON.parse(sessionStorage.getItem("loggedin")).data.id
        )
        .then((responce) => {
          if (responce.status === 200) {
            setAttempts(responce.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsLogin(false);
    }
  };
  return (
    <div className="__Home">
      <Navbar update={fetchUserAttempts} />
      <div className="row m-3">
        <div className="col-sm-12 col-lg-3 col-md-3">
          {(sessionStorage.getItem("loggedin") &&
            JSON.parse(sessionStorage.getItem("loggedin")).type === "user") ||
          isLogin ? (
            <>
              <div className="custom-sidebar pt-3">
                <div className="bg-dark text-light p-2 bg-light rounded-3 text-center">
                  Total Correct :{" "}
                  {attempts.correctattempt ? attempts.correctattempt : "0"}
                </div>
                <div className="mt-2 bg-dark text-light p-2 bg-light rounded-3 text-center">
                  Total Wrong :{" "}
                  {attempts.wrongattempt ? attempts.wrongattempt : "0"}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <Sidebar active={props.active} />
        </div>
        <div className="col-sm-12 col-lg-9 col-md-9">{props.children}</div>
      </div>
    </div>
  );
}

export default Home;
