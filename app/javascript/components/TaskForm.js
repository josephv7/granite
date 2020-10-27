import React, { useState, useEffect } from "react";
import tasksAPI from "../apis/tasks";
import userAPI from "../apis/users";
import setAuthTokenHeader from "../apis/index";
import Spinner from "./Spinner";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const TaskForm = ({ type, taskId, toggle }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [users, setUsers] = useState([]);

  const { addToast } = useToasts();

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
      if (error.response.status == 401) {
        console.log("Unauthenticated User");
        localStorage.removeItem("authToken");
        addToast("User Not Authenticated", {
          appearance: "error",
          autoDismiss: true,
        });
        history.push("/");
      }
    }
  };

  const fetchTask = async (taskId) => {
    if (type == "update") {
      try {
        const response = await tasksAPI.fetchTask(taskId);
        console.log("-----");
        console.log(response);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setUserId(response.data.userId);
        setCreatorId(response.data.creatorId);
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          console.log("Unauthenticated User");
          localStorage.removeItem("authToken");
          addToast("User Not Authenticated", {
            appearance: "error",
            autoDismiss: true,
          });
          history.push("/");
        }
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
        title,
        description,
        user_id: userId,
      });
      console.log(response);
      addToast("Task Created Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        console.log("invalid foreign key");
        addToast("Required user does not exist!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (error.response.status == 401) {
        console.log("Unauthenticated User");
        localStorage.removeItem("authToken");
        addToast("User Not Authenticated", {
          appearance: "error",
          autoDismiss: true,
        });
        history.push("/");
      }
    } finally {
      setSubmit(false);
    }
  };

  const updateTask = async () => {
    try {
      setSubmit(true);
      const response = await tasksAPI.updateTask(taskId, {
        title,
        description,
        user_id: userId,
      });
      addToast("Task Updated Successfullt", {
        appearance: "success",
        autoDismiss: true,
      });
      console.log(response);
      toggle;
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        console.log("invalid foreign key");
        addToast("Required user does not exist!", {
          appearance: "error",
          autoDismiss: true,
        });
        // _.forEach(error.response.data.errors, (value, key) => {
        //   addToast(`${key} ${value}`, { appearance: "error", autoDismiss: true });
        // });
      } else if (error.response.status === 401) {
        console.log("Unauthenticated User");
          localStorage.removeItem("authToken");
          addToast("User Not Authenticated", {
            appearance: "error",
            autoDismiss: true,
          });
          history.push("/");
      }
    } finally {
      setSubmit(false);
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
        <label>Title</label>
        <input
          className="form-control"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          className="form-control"
          placeholder="Enter description"
          value={description}
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
                {item.userName}
              </option>
            );
          })}
        </select>
      </div>
      {submit ? (
        <button
          type="submit"
          className="btn btn-primary ml-1"
          disabled={
            description.length === 0 || userId.length === 0 || title.lengt === 0
          }
        >
          <Spinner />
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitForm}
          disabled={
            description.length === 0 || userId.length === 0 || title.lengt === 0
          }
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default TaskForm;
