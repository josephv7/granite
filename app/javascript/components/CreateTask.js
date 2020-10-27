import React from "react";
import TaskForm from "./TaskForm";
import Navbar from "./Navbar"

const CreateTask = () => {
  return <div>
    <Navbar/>
  <TaskForm type={"create"} />;
  </div>
};

export default CreateTask;
