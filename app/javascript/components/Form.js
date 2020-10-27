import React, { useState } from "react";
import authenticationAPI from "../apis/authentication";
import setAuthTokenHeader from "../apis/index";
import Spinner from "./Spinner";

import { useHistory } from "react-router-dom";
import _ from "lodash";

import { useToasts } from "react-toast-notifications";

const Form = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  const { addToast } = useToasts();

  const loginUser = async () => {
    try {
      setSubmit(true);
      const response = await authenticationAPI.login({ email, password });
      console.log(`success ${response}`);
      localStorage.setItem(
        "authToken",
        response.data.user.authentication_token
      );
      setSubmit(false);
      setAuthTokenHeader(response.data.user.authentication_token);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      setSubmit(false);
      if (error.response.status === 401) {
        console.log("unauthorized");
        addToast("Invalid Username or Password", { appearance: "error" });
      }
    }
  };

  const signupUser = async () => {
    try {
      setSubmit(true);
      const response = await authenticationAPI.signup({
        email,
        password,
        password_confirmation: password,
      });
      setSubmit(false);
      console.log(response.data.user);
      localStorage.setItem(
        "authToken",
        response.data.user.authentication_token
      );
      setAuthTokenHeader(localStorage.getItem("authToken"));
      history.push("/dashboard");
      console.log(response.data.user.authentication_token);
    } catch (error) {
      setSubmit(false);
      if (error.response.status === 422) console.log("unprocessable entity");
      _.forEach(error.response.data.errors, (value, key) => {
        addToast(`${key} ${value}`, { appearance: "error", autoDismiss: true });
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (type == "login") loginUser();
    else if (type == "signup") signupUser();
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {submit ? (
        <button
          type="submit"
          className="btn btn-primary ml-1"
          disabled={email.length === 0 || password.length === 0}
        >
          <Spinner />
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitForm}
          disabled={email.length === 0 || password.length === 0}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default Form;
