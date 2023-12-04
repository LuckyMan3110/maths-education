import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./views/Home";
import Arithmetic from "./views/Arithmetic";
const parentPath = "";

function App(props) {
  return (
    <>
      <Switch>
        <Route exact path={`${parentPath}/arithmetic`}>
          <Home active="arithmetic">
            <Arithmetic />
          </Home>
        </Route>
        <Route path={`${parentPath}/`}>
          <Home active="arithmetic">
            <Arithmetic />
          </Home>
        </Route>
      </Switch>
    </>
  );
}

export default App;
