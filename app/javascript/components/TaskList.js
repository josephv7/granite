import React, { useState, useEffect } from "react";
import Card from "./Card";
import tasksAPI from "../apis/tasks";
import setAuthTokenHeader from "../apis/index";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setAuthTokenHeader(localStorage.getItem("authToken"));
    try {
      const response = await tasksAPI.listTasks();
      console.log(response);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasks.length > 0) {
    return (
      <Card>
        {tasks.map((item, index) => {
          return (
            <div
              className="d-flex flex-row justify-content-around align-items-center w-100 flex-wrap"
              key={index}
            >
              <button
                type="button"
                className="btn btn-light w-25 my-1"
                disabled
              >
                {item.id}
              </button>
              <button
                type="button"
                className="btn btn-light w-25 my-1"
                disabled
              >
                {item.description}
              </button>
              {/* <button type="button" className=" btn btn-light w-10" disabled>
                {item.count}
              </button>
              <button
                type="button"
                className=" btn btn-light w-10"
                onClick={() => showLogs(item.id)}
              >
                View Logs
              </button> */}
            </div>
          );
        })}
      </Card>
    );
  }else {
    return (
      <h1>No Tasks</h1>
    )
  }
};

export default TaskList;
