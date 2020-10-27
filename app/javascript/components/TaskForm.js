import React, { useState, useEffect } from "react";
import tasksAPI from "../apis/tasks";
import userAPI from "../apis/users";
import setAuthTokenHeader from "../apis/index";
import Spinner from "./Spinner";

import { useHistory } from "react-router-dom";
import _ from "lodash";

const TaskForm = ({ type }) => {
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  const fetchUsers = async () => {
    setAuthTokenHeader(localStorage.getItem("authToken"));
    try {
      const response = await userAPI.listUsers();
      console.log(response);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createTask = async () => {
    try {
      setSubmit(true);
      const response = await tasksAPI.createTask({
        description,
        user_id: userId,
      });
      console.log(`success ${response}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) console.log("invalid foreign key");
    } finally {
      setSubmit(false);
    }
  };

  const updateTask = async () => {
    try {
      setSubmit(true);
      const response = await tasksAPI.updateTask({
        description,
        user_id: userId,
      });
      console.log(`success ${response}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) console.log("invalid foreign key");
    } finally {
      setSubmit(false);
    }
  };

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
      if (error.response.status === 401) console.log("unauthorized");
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
      // _.forEach(error.response.data.errors, (value, key) => {
      //   addToast(`${key} ${value}`, { appearance: "error", autoDismiss: true });
      // });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (type == "create") createTask();
    else if (type == "update") updateTask();
  };

  return (
    <form>
      <div className="form-group">
        <label>Description</label>
        <input
          className="form-control"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* <div className="form-group">
        <label>User Id</label>
        <input
          type="text"
          className="form-control"
          placeholder="User Id"
          onChange={(e) => setUserId(e.target.value)}
        />
      </div> */}
      <div className="form-group">
    <label>Assign To User</label>
    <select className="form-control" onChange={(e)=> console.log(e.target.value)}>
      {users.map((item, index) => {
        return(
          <option key={index}>{item.email}</option>
        )
      })}
    </select>
  </div>
      {submit ? (
        <button
          type="submit"
          className="btn btn-primary ml-1"
          disabled={description.length === 0 || userId.length === 0}
        >
          <Spinner />
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitForm}
          disabled={description.length === 0 || userId.length === 0}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default TaskForm;
