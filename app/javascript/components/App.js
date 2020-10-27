import React, { useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import CreateTask from "./CreateTask";
import Dashboard from "./Dashboard";
import Details from "./Details";
import PrivateRoute from "./PrivateRoute";
import setAuthTokenHeader from "../apis/index";
import authenticated from "./helpers/auth";
import { ToastProvider } from "react-toast-notifications";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    console.log("app use effect" + localStorage.getItem("authToken"));
    setAuthTokenHeader(localStorage.getItem("authToken"));
  }, []);

  return (
    <ToastProvider>
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        {/* <Route path="/create" component={CreateTask} /> */}
        <PrivateRoute
          path="/create"
          redirectRoute="/"
          component={CreateTask}
          condition={authenticated}
        />
        {/* <Route path="/tasks/:id" component={Details} /> */}
        <PrivateRoute
          path="/tasks/:id"
          redirectRoute="/"
          component={Details}
          condition={authenticated}
        />
        <PrivateRoute
          path="/dashboard"
          redirectRoute="/"
          component={Dashboard}
          condition={authenticated}
        />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
    </ToastProvider>
  );
};

export default App;
