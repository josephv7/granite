import React, { useState, useEffect } from "react";
import tasksAPI from "../apis/tasks";
import userAPI from "../apis/users";
import setAuthTokenHeader from "../apis/index";
import Spinner from "./Spinner";

import { useHistory } from "react-router-dom";
import _ from "lodash";

const TaskForm = ({ type, taskId }) => {
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

  const fetchTask = async (taskId) => {
    if (type == "update") {
      try {
        const response = await tasksAPI.fetchTask(taskId);
        console.log("-----");
        console.log(response);
        setDescription(response.data.description)
        setUserId(response.data.creatorId)
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTask(taskId);
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
      const response = await tasksAPI.updateTask(taskId,{
        description,
        user_id: userId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) console.log("invalid foreign key");
    } finally {
      setSubmit(false);
    }
  };


  // _.forEach(error.response.data.errors, (value, key) => {
      //   addToast(`${key} ${value}`, { appearance: "error", autoDismiss: true });
      // });

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
          value = {description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Assign To User</label>
        <select
          className="form-control"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
        >
          {users.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.email}
              </option>
            );
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
