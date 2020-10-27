import React from "react";
import TaskForm from "./TaskForm";
import Navbar from "./Navbar"
import Container from "./Container"

const CreateTask = () => {
  return <>
    <Navbar/>
    <Container>
  <TaskForm type={"create"} />
  </Container>
  </>
};

export default CreateTask;
