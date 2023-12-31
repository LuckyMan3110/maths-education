import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminApp from "./admin/App";
import UserApp from "./user/App";

ReactDOM.render(
  <React.StrictMode>
    <>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminApp />
          </Route>
          <Route path="/">
            <UserApp />
          </Route>
        </Switch>
      </Router>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
