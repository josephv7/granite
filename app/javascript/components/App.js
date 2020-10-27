import React, { useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import CreateTask from "./CreateTask"
import UpdateTask from "./UpdateTask"
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import setAuthTokenHeader from "../apis/index";
import authenticated from "./helpers/auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    console.log("app use effect" + localStorage.getItem("authToken"));
    setAuthTokenHeader(localStorage.getItem("authToken"));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/create" component={CreateTask} />
        <Route path="/update" component={UpdateTask} />
        <PrivateRoute
          path="/dashboard"
          redirectRoute="/"
          component={Dashboard}
          condition={authenticated}
        />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
