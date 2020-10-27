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

  const deleteTask = async (id) => {
    try{
      const response = await tasksAPI.deleteTask(id)
      console.log(response)
    }catch(error){
      console.log(error)
      if(error.response.status == 403) 
        console.log("No permission")
    }finally{

    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasks.length > 0) {
    return (
      <div>
        {tasks.map((item, index) => {
          return (
            
            <div className="card" style={{width: "18rem"}} key={index}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                  {item.description}
                </p>
                <a href="#" className="card-link">
                  Update
                </a>
                <a className="card-link" onClick={()=> deleteTask(item.id)}>
                  Delete
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>No Tasks</h1>;
  }
};

export default TaskList;
