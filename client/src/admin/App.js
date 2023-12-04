import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Arithmetic from "./views/Arithmetic";
const parentPath = "/admin";
// function to guard the component for private access
const authGuard = (Component) => () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).type === "admin" ? (
    <Component />
  ) : (
    <Redirect to={`${parentPath}/login`} />
  );
};

// function to guard the login/signup for logged in access
const authGuardGates = (Component) => () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).type === "admin" ? (
    <Redirect to={`${parentPath}`} />
  ) : (
    <Component />
  );
};

function App(props) {
  return (
    <>
      <Switch>
        <Route
          exact
          path={`${parentPath}/login`}
          component={authGuardGates(Login)}
        />
        <Route
          path={`${parentPath}/arithmetic`}
          component={authGuard(Arithmetic)}
        />
        <Route path={`${parentPath}/`} component={authGuard(Home)} />
      </Switch>
    </>
  );
}

export default App;
